<?php
/**
 * Standalone Laravel 11 Artisan Maintenance Runner for cPanel / Shared Hosting
 * 
 * Fitur:
 * - Error reporting aktif (tidak blank 500)
 * - Auto-detect path Laravel (baik di /public maupun /public_html)
 * - Menjalankan migrate, config:clear, cache:clear, route:clear, view:clear
 * - Fitur Self-Delete setelah selesai untuk keamanan
 */

// Aktifkan error reporting penuh agar tidak terjadi error 500 tanpa pesan
error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');

// Kunci Keamanan Rahasia
$secretKey = 'sgin2026';

// Validasi Akses
$providedKey = $_GET['key'] ?? $_POST['key'] ?? '';
$isAuthorized = (!empty($providedKey) && hash_equals($secretKey, (string)$providedKey));

// Fitur Hapus File Mandiri untuk Keamanan
if (isset($_POST['action']) && $_POST['action'] === 'self_delete' && $isAuthorized) {
    @unlink(__FILE__);
    die("<div style='font-family:sans-serif;padding:30px;background:#0f172a;color:#10b981;text-align:center;'><h2>✔ File run-artisan.php berhasil dihapus dari server!</h2><p style='color:#94a3b8;margin-top:10px;'>Server Anda kini aman. Silakan tutup tab ini.</p></div>");
}

// Deteksi lokasi vendor/autoload.php dan bootstrap/app.php secara fleksibel
$baseDir = null;
$possiblePaths = [
    dirname(__DIR__),                  // Normal: file ada di public/
    __DIR__,                           // Alternatif: file ada di root project
    dirname(__DIR__, 2),               // Alternatif: custom public_html path
];

$autoloadPath = null;
$bootstrapPath = null;

foreach ($possiblePaths as $path) {
    if (file_exists($path . '/vendor/autoload.php') && file_exists($path . '/bootstrap/app.php')) {
        $baseDir = $path;
        $autoloadPath = $path . '/vendor/autoload.php';
        $bootstrapPath = $path . '/bootstrap/app.php';
        break;
    }
}

$shouldRun = $isAuthorized && (isset($_POST['action']) && $_POST['action'] === 'run_commands' || isset($_GET['run']));
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SGIN Laravel Artisan Runner</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: #0b1120; color: #f8fafc; padding: 24px; }
        .container { max-width: 850px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 32px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6); border: 1px solid #334155; }
        h1 { color: #10b981; font-size: 22px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
        p.subtitle { color: #94a3b8; font-size: 13px; margin-bottom: 20px; }
        .alert { background: #334155; border-left: 4px solid #38bdf8; padding: 14px 18px; border-radius: 8px; font-size: 13px; margin-bottom: 20px; color: #e2e8f0; line-height: 1.5; }
        .alert.error { border-left-color: #ef4444; background: #450a0a; color: #fca5a5; }
        .alert.success { border-left-color: #10b981; background: #064e3b; color: #a7f3d0; }
        code { background: #0f172a; padding: 2px 6px; border-radius: 4px; color: #38bdf8; font-family: Consolas, monospace; }
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #059669; color: #fff; font-weight: 600; font-size: 13px; padding: 12px 22px; border-radius: 8px; border: none; cursor: pointer; text-decoration: none; transition: 0.2s; }
        .btn:hover { background: #10b981; }
        .btn-danger { background: #dc2626; }
        .btn-danger:hover { background: #ef4444; }
        .btn-secondary { background: #475569; }
        .btn-secondary:hover { background: #64748b; }
        .console { background: #020617; border-radius: 8px; padding: 18px; margin-top: 24px; border: 1px solid #1e293b; font-family: Consolas, "Courier New", monospace; font-size: 12.5px; line-height: 1.6; color: #e2e8f0; max-height: 550px; overflow-y: auto; }
        .cmd-title { color: #38bdf8; font-weight: bold; margin-top: 16px; margin-bottom: 6px; border-bottom: 1px dashed #334155; padding-bottom: 4px; }
        .cmd-title:first-child { margin-top: 0; }
        .badge-success { color: #34d399; font-weight: bold; }
        .badge-fail { color: #f87171; font-weight: bold; }
        .actions-bar { margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap; }
    </style>
</head>
<body>

<div class="container">
    <h1>⚡ SGIN Laravel Maintenance & Migration Runner</h1>
    <p class="subtitle">Eksekutor Artisan otomatis untuk server cPanel/Cloud hosting tanpa SSH.</p>

    <?php if (!$isAuthorized): ?>
        <div class="alert error">
            <strong>⛔ Akses Ditolak!</strong> Anda harus menyertakan kunci keamanan (Secret Key).<br><br>
            Format URL yang benar:<br>
            <code>https://www.sgin.co.id/run-artisan.php?key=<?= htmlspecialchars($secretKey) ?></code>
        </div>
    <?php else: ?>
        <div class="alert success">
            ✔ Kunci keamanan valid (<code><?= htmlspecialchars($providedKey) ?></code>).<br>
            Lokasi Base Laravel: <code><?= htmlspecialchars($baseDir ?: 'Tidak Ditemukan!') ?></code>
        </div>

        <?php if (!$autoloadPath): ?>
            <div class="alert error">
                <strong>Gagal Menemukan Laravel Core!</strong> File <code>vendor/autoload.php</code> atau <code>bootstrap/app.php</code> tidak ditemukan di sekitar direktori file ini. Pastikan file ini berada di dalam folder <code>public/</code> atau <code>public_html/</code> website Anda.
            </div>
        <?php else: ?>

            <form method="POST" action="?key=<?= htmlspecialchars($providedKey) ?>">
                <input type="hidden" name="action" value="run_commands">
                <button type="submit" class="btn">🚀 Eksekusi Migrasi & Bersihkan Cache Sekarang</button>
            </form>

            <?php
            if ($shouldRun):
                echo '<div class="console">';
                
                try {
                    if (!defined('LARAVEL_START')) {
                        define('LARAVEL_START', microtime(true));
                    }

                    require_once $autoloadPath;
                    $app = require_once $bootstrapPath;

                    // Bootstrap console kernel
                    $kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
                    $kernel->bootstrap();

                    $commands = [
                        'migrate' => ['name' => 'php artisan migrate --force', 'args' => ['--force' => true]],
                        'config:clear' => ['name' => 'php artisan config:clear', 'args' => []],
                        'cache:clear' => ['name' => 'php artisan cache:clear', 'args' => []],
                        'route:clear' => ['name' => 'php artisan route:clear', 'args' => []],
                        'view:clear' => ['name' => 'php artisan view:clear', 'args' => []],
                    ];

                    foreach ($commands as $cmd => $meta) {
                        echo "<div class='cmd-title'>▶ Menjalankan: {$meta['name']}</div>";
                        try {
                            $exitCode = \Illuminate\Support\Facades\Artisan::call($cmd, $meta['args']);
                            $output = trim(\Illuminate\Support\Facades\Artisan::output());
                            
                            if (!empty($output)) {
                                echo nl2br(htmlspecialchars($output)) . "<br>";
                            }
                            
                            if ($exitCode === 0) {
                                echo "<span class='badge-success'>✔ Berhasil (Status 0)</span><br>";
                            } else {
                                echo "<span class='badge-fail'>⚠ Kode status: {$exitCode}</span><br>";
                            }
                        } catch (\Throwable $cmdEx) {
                            echo "<span class='badge-fail'>✖ Gagal: " . htmlspecialchars($cmdEx->getMessage()) . "</span><br>";
                        }
                    }

                    echo "<br><div class='badge-success' style='font-size:14px;'>🎉 SEMUA PROSES MAINTENANCE SELESAI DENGAN SUKSES!</div>";

                } catch (\Throwable $e) {
                    echo "<span class='badge-fail'>✖ FATAL ERROR: " . htmlspecialchars($e->getMessage()) . "</span><br>";
                    echo "<pre style='color:#fca5a5; font-size:11px; margin-top:8px;'>" . htmlspecialchars($e->getFile() . ':' . $e->getLine() . "\n" . $e->getTraceAsString()) . "</pre>";
                }

                echo '</div>';
            ?>

                <div class="actions-bar">
                    <form method="POST" action="?key=<?= htmlspecialchars($providedKey) ?>" onsubmit="return confirm('Yakin ingin menghapus file runner ini dari server?');">
                        <input type="hidden" name="action" value="self_delete">
                        <button type="submit" class="btn btn-danger">🗑️ Hapus File Runner Ini dari Server</button>
                    </form>
                    <a href="/sginco-manage" class="btn btn-secondary" target="_blank">Buka Halaman Login CMS &rarr;</a>
                </div>

            <?php endif; ?>

        <?php endif; ?>

    <?php endif; ?>
</div>

</body>
</html>
