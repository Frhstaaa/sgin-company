<?php
/**
 * ==============================================================================
 * SCRIPT UPDATE OTOMATIS CYBERPANEL / VPS VIA GITHUB
 * ==============================================================================
 * Cara Pemakaian di Browser:
 * https://domain-anda.com/update.php?token=sugiyama-update
 */

// 1. Kunci Keamanan (Token)
$secretToken = 'sugiyama-update';

if (!isset($_GET['token']) || $_GET['token'] !== $secretToken) {
    header('HTTP/1.1 403 Forbidden');
    echo "<!DOCTYPE html><html><body style='font-family:sans-serif;background:#0d1117;color:#f85149;padding:40px;text-align:center;'>";
    echo "<h2>🚫 Akses Ditolak (403 Forbidden)</h2>";
    echo "<p style='color:#8b949e;'>Token tidak valid atau tidak disertakan. Tambahkan parameter: <code>?token=sugiyama-update</code> pada URL.</p>";
    echo "</body></html>";
    exit;
}

// 2. Mencegah Timeout jika proses pull/build agak lama
@set_time_limit(300);
@ini_set('max_execution_time', '300');

// 3. Masuk ke root direktori proyek Laravel
$basePath = dirname(__DIR__);
chdir($basePath);

// 4. Konfigurasi Environment (PATH & HOME untuk Linux/CyberPanel)
$currentPath = getenv('PATH') ?: '';
putenv("PATH={$currentPath}:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games:/usr/local/lsws/lsphp82/bin:/usr/local/lsws/lsphp81/bin:/usr/local/lsws/lsphp83/bin");

$userHome = dirname($basePath);
if (!is_dir($userHome) || !is_writable($userHome)) {
    $userHome = sys_get_temp_dir() ?: '/tmp';
}
putenv("HOME={$userHome}");

// Buffer output agar log langsung tampil di browser secara streaming
if (function_exists('ob_implicit_flush')) {
    ob_implicit_flush(true);
}
while (@ob_end_flush());

?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Git Auto-Update Server</title>
    <style>
        * { box-sizing: border-box; }
        body {
            background-color: #0d1117;
            color: #c9d1d9;
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
            padding: 24px;
            margin: 0;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 8px;
            padding: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        h1 { color: #58a6ff; font-size: 20px; margin-top: 0; display: flex; align-items: center; gap: 8px; }
        .step-box {
            background: #0d1117;
            border: 1px solid #21262d;
            border-left: 4px solid #58a6ff;
            border-radius: 4px;
            padding: 14px;
            margin-bottom: 16px;
        }
        .step-title { color: #79c0ff; font-weight: bold; font-size: 14px; margin-bottom: 6px; }
        .command-badge { color: #e3b341; font-size: 13px; margin-bottom: 8px; display: block; }
        pre { margin: 0; white-space: pre-wrap; word-break: break-all; font-size: 13px; color: #8b949e; line-height: 1.4; }
        .success-box {
            background: rgba(46, 160, 67, 0.15);
            border: 1px solid #2ea043;
            color: #3fb950;
            padding: 16px;
            border-radius: 6px;
            margin-top: 24px;
            text-align: center;
        }
        .btn {
            display: inline-block;
            background: #238636;
            color: #ffffff;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 10px;
            font-weight: 600;
        }
        .btn:hover { background: #2ea043; }
    </style>
</head>
<body>
<div class="container">
    <h1>🚀 Memulai Pembaruan Sistem dari GitHub</h1>
    <p style="color: #8b949e; font-size: 13px; margin-bottom: 20px;">
        Waktu: <?= date('Y-m-d H:i:s') ?> | Direktori: <?= htmlspecialchars($basePath) ?> | Server User: <?= htmlspecialchars(get_current_user() ?: 'web-service') ?>
    </p>

    <?php
    // Hapus public/hot untuk mencegah masalah CORS / dev server Vite
    $hotFile = __DIR__ . '/hot';
    if (file_exists($hotFile)) {
        @unlink($hotFile);
        echo "<div class='step-box' style='border-left-color: #3fb950;'>";
        echo "<div class='step-title'>🧹 Membersihkan File Development</div>";
        echo "<pre style='color: #3fb950;'>✅ File public/hot berhasil dihapus.</pre>";
        echo "</div>";
    }

    $repoUrl = 'https://github.com/Frhstaaa/sgin-company.git';
    $commands = [];

    // Konfigurasi safe.directory untuk git
    $commands['1. Konfigurasi Git Safe Directory'] = "git config --global --add safe.directory " . escapeshellarg($basePath);

    // Cek apakah .git sudah ada di server
    if (!is_dir($basePath . '/.git')) {
        echo "<div class='step-box' style='border-left-color: #e3b341;'>";
        echo "<div class='step-title'>⚠️ Inisialisasi Git Baru di Server</div>";
        echo "<pre style='color: #e3b341;'>Folder .git belum ditemukan di server. Memulai inisialisasi git dan menghubungkan ke repository GitHub...</pre>";
        echo "</div>";

        $commands['2. Inisialisasi Git Repository'] = 'git init';
        $commands['3. Hubungkan Remote Origin'] = "git remote add origin $repoUrl || git remote set-url origin $repoUrl";
        $commands['4. Fetch Branch Main'] = 'git fetch origin main';
        $commands['5. Sinkronisasi Kode (Reset Hard ke Main)'] = 'git reset --hard origin/main';
        $commands['6. Set Upstream Branch'] = 'git branch -M main && git branch --set-upstream-to=origin/main main';
    } else {
        $commands['2. Perbarui URL Remote Origin'] = "git remote set-url origin $repoUrl";
        $commands['3. Fetch Kode Terbaru dari GitHub'] = 'git fetch origin main';
        $commands['4. Sinkronisasi Kode (Reset Hard ke Main)'] = 'git reset --hard origin/main';
    }

    // Perintah Maintenance Laravel
    $commands['Bersihkan Cache Laravel'] = 'php artisan optimize:clear';
    $commands['Hubungkan Storage Symlink'] = 'php artisan storage:link';
    $commands['Jalankan Migrasi Database'] = 'php artisan migrate --force';
    $commands['Optimasi Cache Produksi'] = 'php artisan optimize';

    // Eksekusi Setiap Perintah
    foreach ($commands as $stepName => $cmd) {
        echo "<div class='step-box'>";
        echo "<div class='step-title'>" . htmlspecialchars($stepName) . "</div>";
        echo "<span class='command-badge'>$ " . htmlspecialchars($cmd) . "</span>";

        $output = shell_exec($cmd . ' 2>&1');

        if ($output === null || trim($output) === '') {
            echo "<pre style='color: #8b949e;'>[Selesai tanpa output tambahan]</pre>";
        } else {
            echo "<pre style='color: #c9d1d9;'>" . htmlspecialchars($output) . "</pre>";
        }
        echo "</div>";
        flush();
    }
    ?>

    <div class="success-box">
        <h2 style="margin: 0 0 8px 0;">🎉 PEMBARUAN SELESAI DILAKUKAN!</h2>
        <p style="margin: 0 0 12px 0; color: #c9d1d9; font-size: 14px;">Semua kodingan terbaru dari branch <code>main</code> telah berhasil disinkronkan ke CyberPanel.</p>
        <a href="/" class="btn" target="_blank">Lihat Website Utama →</a>
    </div>
</div>
</body>
</html>
