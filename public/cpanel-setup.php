<?php
/**
 * ==============================================================================
 * CPANEL LARAVEL DEPLOYMENT & MAINTENANCE TOOLKIT
 * PT. Sugiyama Indonesia (https://sgin.frahesta.com)
 * ==============================================================================
 * Akses via Browser:
 * https://domain-anda.com/cpanel-setup.php?token=sugiyama-update
 */

$secretToken = 'sugiyama-update';

if (!isset($_GET['token']) || $_GET['token'] !== $secretToken) {
    header('HTTP/1.1 403 Forbidden');
    echo "<!DOCTYPE html><html><body style='font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#f87171;padding:50px;text-align:center;'>";
    echo "<h2>🚫 Akses Ditolak (403 Forbidden)</h2>";
    echo "<p style='color:#94a3b8;'>Sertakan token keamanan: <code>?token=sugiyama-update</code> pada URL.</p>";
    echo "</body></html>";
    exit;
}

@set_time_limit(300);
@ini_set('max_execution_time', '300');

$basePath = dirname(__DIR__);
chdir($basePath);

// Deteksi executable PHP di cPanel / VPS
$phpCli = 'php';
$possiblePhpPaths = [
    '/usr/local/bin/php',
    '/usr/bin/php',
    '/usr/local/lsws/lsphp82/bin/php',
    '/usr/local/lsws/lsphp83/bin/php',
    '/usr/local/lsws/lsphp81/bin/php',
    '/opt/cpanel/ea-php82/root/usr/bin/php',
    '/opt/cpanel/ea-php83/root/usr/bin/php',
    '/opt/cpanel/ea-php81/root/usr/bin/php',
];
foreach ($possiblePhpPaths as $path) {
    if (@is_executable($path)) {
        $phpCli = $path;
        break;
    }
}

// Action Handler
$action = $_GET['action'] ?? 'dashboard';
$outputLog = '';

function runCmd($cmd) {
    global $basePath;
    $fullCmd = "cd " . escapeshellarg($basePath) . " && {$cmd} 2>&1";
    return shell_exec($fullCmd) ?: '(Tidak ada output atau fungsi shell_exec dibatasi)';
}

if ($action === 'git_pull') {
    $outputLog .= "=== GIT PULL REPOSITORY ===\n";
    $outputLog .= runCmd("git config --global --add safe.directory " . escapeshellarg($basePath)) . "\n";
    $outputLog .= runCmd("git fetch origin main") . "\n";
    $outputLog .= runCmd("git reset --hard origin/main") . "\n";
    $outputLog .= runCmd("{$phpCli} artisan optimize:clear") . "\n";
} elseif ($action === 'storage_link') {
    $outputLog .= "=== MEMBUAT STORAGE SYMLINK ===\n";
    $target = $basePath . '/storage/app/public';
    $link = $basePath . '/public/storage';
    if (is_link($link)) {
        @unlink($link);
    }
    if (@symlink($target, $link)) {
        $outputLog .= "✅ Symlink berhasil dibuat via PHP symlink() -> $link\n";
    } else {
        $outputLog .= runCmd("{$phpCli} artisan storage:link") . "\n";
    }
} elseif ($action === 'migrate') {
    $outputLog .= "=== MIGRASI DATABASE ===\n";
    $outputLog .= runCmd("{$phpCli} artisan migrate --force") . "\n";
} elseif ($action === 'migrate_seed') {
    $outputLog .= "=== MIGRATE FRESH & SEED (RESET DATABASE) ===\n";
    $outputLog .= runCmd("{$phpCli} artisan migrate:fresh --seed --force") . "\n";
} elseif ($action === 'key_generate') {
    $outputLog .= "=== GENERATE APP_KEY ===\n";
    $outputLog .= runCmd("{$phpCli} artisan key:generate --force") . "\n";
} elseif ($action === 'clear_cache') {
    $outputLog .= "=== BERSIHKAN SEMUA CACHE ===\n";
    $outputLog .= runCmd("{$phpCli} artisan optimize:clear") . "\n";
    $outputLog .= runCmd("{$phpCli} artisan config:clear") . "\n";
    $outputLog .= runCmd("{$phpCli} artisan route:clear") . "\n";
    $outputLog .= runCmd("{$phpCli} artisan view:clear") . "\n";
}

// Cek status environment
$hasEnv = file_exists($basePath . '/.env');
$hasStorageLink = is_link($basePath . '/public/storage') || is_dir($basePath . '/public/storage');
$hasBuild = is_dir($basePath . '/public/build');
$hasVendor = is_dir($basePath . '/vendor');
$phpVersion = PHP_VERSION;
$requiredExtensions = ['openssl', 'pdo', 'pdo_mysql', 'mbstring', 'tokenizer', 'xml', 'ctype', 'json', 'fileinfo', 'gd'];
$missingExtensions = [];
foreach ($requiredExtensions as $ext) {
    if (!extension_loaded($ext)) {
        $missingExtensions[] = $ext;
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>cPanel Laravel Setup & Deployment Tool - PT. Sugiyama Indonesia</title>
    <style>
        * { box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #0b132b;
            color: #e2e8f0;
            margin: 0;
            padding: 30px 15px;
        }
        .container {
            max-width: 960px;
            margin: 0 auto;
        }
        .card {
            background: #1c2541;
            border: 1px solid #3a506b;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        h1, h2, h3 { margin-top: 0; }
        h1 { color: #6fffe9; font-size: 24px; display: flex; align-items: center; gap: 10px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px; }
        .status-badge {
            background: #0b132b;
            border: 1px solid #3a506b;
            padding: 14px;
            border-radius: 12px;
        }
        .status-badge .label { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: bold; }
        .status-badge .val { font-size: 15px; font-weight: bold; margin-top: 4px; display: flex; align-items: center; gap: 6px; }
        .ok { color: #4ade80; }
        .warn { color: #fbbf24; }
        .err { color: #f87171; }
        .btn-group { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px; }
        .btn {
            background: #007155;
            color: #ffffff;
            border: none;
            padding: 10px 18px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 13px;
            text-decoration: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s;
        }
        .btn:hover { background: #005944; transform: translateY(-1px); }
        .btn-blue { background: #2563eb; }
        .btn-blue:hover { background: #1d4ed8; }
        .btn-amber { background: #d97706; }
        .btn-amber:hover { background: #b45309; }
        .btn-slate { background: #475569; }
        .btn-slate:hover { background: #334155; }
        pre {
            background: #0b132b;
            border: 1px solid #3a506b;
            padding: 16px;
            border-radius: 12px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 13px;
            color: #38bdf8;
            white-space: pre-wrap;
            word-break: break-all;
            max-height: 400px;
            overflow-y: auto;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="card">
        <h1>⚙️ cPanel Laravel Deployment Toolkit</h1>
        <p style="color:#94a3b8;font-size:13px;margin:0 0 16px 0;">
            PT. Sugiyama Indonesia &bull; Direktori Proyek: <code><?= htmlspecialchars($basePath) ?></code>
        </p>

        <div class="grid">
            <div class="status-badge">
                <div class="label">PHP Version (CLI)</div>
                <div class="val <?= version_compare($phpVersion, '8.2.0', '>=') ? 'ok' : 'err' ?>">
                    <?= $phpVersion ?>
                </div>
            </div>
            <div class="status-badge">
                <div class="label">File .env</div>
                <div class="val <?= $hasEnv ? 'ok' : 'err' ?>">
                    <?= $hasEnv ? '✅ Terkonfigurasi' : '❌ Belum Ada (.env)' ?>
                </div>
            </div>
            <div class="status-badge">
                <div class="label">Storage Symlink</div>
                <div class="val <?= $hasStorageLink ? 'ok' : 'warn' ?>">
                    <?= $hasStorageLink ? '✅ Terhubung' : '⚠️ Belum Terhubung' ?>
                </div>
            </div>
            <div class="status-badge">
                <div class="label">Frontend Assets (Vite)</div>
                <div class="val <?= $hasBuild ? 'ok' : 'err' ?>">
                    <?= $hasBuild ? '✅ Build Lengkap' : '❌ public/build Kosong' ?>
                </div>
            </div>
        </div>

        <?php if (!empty($missingExtensions)): ?>
            <div style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;padding:12px;border-radius:10px;margin-bottom:15px;color:#fca5a5;font-size:13px;">
                ⚠️ <strong>Ekstensi PHP yang belum aktif di cPanel:</strong> <?= implode(', ', $missingExtensions) ?>. Aktifkan di menu cPanel &gt; <em>Select PHP Version</em>.
            </div>
        <?php endif; ?>

        <h3>🚀 Tindakan Cepat (1-Klik):</h3>
        <div class="btn-group">
            <a href="?token=<?= $secretToken ?>&action=git_pull" class="btn btn-blue">
                🔄 Git Pull (Ambil Kode Terbaru)
            </a>
            <a href="?token=<?= $secretToken ?>&action=storage_link" class="btn">
                🔗 Hubungkan Storage Symlink
            </a>
            <a href="?token=<?= $secretToken ?>&action=migrate" class="btn">
                🗄️ Jalankan Migrasi Database
            </a>
            <a href="?token=<?= $secretToken ?>&action=clear_cache" class="btn btn-slate">
                🧹 Bersihkan Cache Laravel
            </a>
            <a href="?token=<?= $secretToken ?>&action=key_generate" class="btn btn-amber">
                🔑 Generate APP_KEY
            </a>
            <a href="?token=<?= $secretToken ?>&action=migrate_seed" class="btn btn-amber" onclick="return confirm('PERINGATAN: Ini akan mereset database dan mengisinya dengan data seed bawaan. Lanjutkan?');">
                ⚡ Reset & Seed Database
            </a>
        </div>
    </div>

    <?php if (!empty($outputLog)): ?>
    <div class="card">
        <h2>📄 Output Log Eksekusi:</h2>
        <pre><?= htmlspecialchars($outputLog) ?></pre>
    </div>
    <?php endif; ?>

    <div class="card" style="font-size:13px;color:#94a3b8;line-height:1.6;">
        <h3 style="color:#e2e8f0;">📌 Panduan Singkat Deploy di cPanel:</h3>
        <ol style="padding-left:20px;margin:0;">
            <li>Pastikan versi PHP di cPanel adalah <strong>PHP 8.2 atau PHP 8.3</strong> (di menu <em>Select PHP Version</em> atau <em>MultiPHP Manager</em>).</li>
            <li>Buat database MySQL dan user database di menu <strong>MySQL Databases</strong> cPanel.</li>
            <li>Salin file <code>.env.example</code> menjadi <code>.env</code> di root folder, lalu sesuaikan <code>DB_DATABASE</code>, <code>DB_USERNAME</code>, dan <code>DB_PASSWORD</code>.</li>
            <li>Klik tombol <strong>"🔗 Hubungkan Storage Symlink"</strong> dan <strong>"🗄️ Jalankan Migrasi Database"</strong> di atas.</li>
            <li>Website Anda siap digunakan!</li>
        </ol>
    </div>
</div>
</body>
</html>
