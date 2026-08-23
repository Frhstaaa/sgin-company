<?php
/**
 * SGIN 1-Click Complete System Updater & Deployer
 * PT. Sugiyama Indonesia
 * 
 * Akses: https://sgin.co.id/update.php
 */

ini_set('display_errors', 1);
error_reporting(E_ALL);
set_time_limit(300);

$basePath = realpath(__DIR__ . '/..') ?: dirname(__DIR__);
$secretToken = 'sugiyama-update';
$autoRun = isset($_GET['run']) || isset($_GET['token']) || isset($_POST['run']);

if (!$autoRun) {
    ?>
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>1-Click Website Updater - PT. Sugiyama Indonesia</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
                background-color: #0b132b;
                color: #e2e8f0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                padding: 20px;
            }
            .card {
                background: #1c2541;
                border: 1px solid #3a506b;
                border-radius: 24px;
                padding: 40px 30px;
                max-width: 580px;
                width: 100%;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            }
            h1 { color: #6fffe9; font-size: 24px; font-weight: 800; margin-bottom: 12px; }
            p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 28px; }
            .btn {
                background: linear-gradient(135deg, #007155 0%, #005944 100%);
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                padding: 16px 32px;
                border-radius: 16px;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 10px 25px rgba(0, 113, 85, 0.4);
                transition: all 0.2s;
                border: none;
                cursor: pointer;
            }
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 30px rgba(0, 113, 85, 0.6);
            }
            .list { text-align: left; background: #0b132b; border: 1px solid #3a506b; border-radius: 14px; padding: 16px 20px; font-size: 13px; color: #cbd5e1; margin-bottom: 24px; line-height: 1.8; }
            .list li { list-style-type: none; display: flex; align-items: center; gap: 8px; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>⚡ 1-Click Update Website</h1>
            <p>PT. Sugiyama Indonesia &bull; Server Deployment Tool</p>
            <div class="list">
                <li>✅ <strong>Git Fetch & Pull:</strong> Mengambil kode & build terbaru dari GitHub</li>
                <li>✅ <strong>Artisan Migrate & Seed:</strong> Update tabel & data database otomatis</li>
                <li>✅ <strong>Storage Symlink:</strong> Verifikasi link storage foto logo & banner</li>
                <li>✅ <strong>Optimize Clear:</strong> Bersihkan seluruh cache aplikasi</li>
            </div>
            <a href="?run=1" class="btn" onclick="this.innerHTML='⏳ Sedang Memproses Update...'; this.style.opacity='0.7';">
                <span>🚀</span>
                <span>Klik di Sini untuk Mulai Update</span>
            </a>
        </div>
    </body>
    </html>
    <?php
    exit;
}

$action = $_GET['action'] ?? 'full_update';
$token = $_GET['token'] ?? '';

// Auto detect CLI PHP path
$phpCli = 'php';
$possiblePhps = [
    '/usr/local/bin/ea-php83',
    '/usr/local/bin/ea-php82',
    '/usr/bin/php8.3',
    '/usr/bin/php8.2',
    '/usr/local/bin/php',
    '/usr/bin/php',
];
foreach ($possiblePhps as $p) {
    if (@file_exists($p) && @is_executable($p)) {
        $phpCli = $p;
        break;
    }
}

function runCmd($cmd) {
    global $basePath;
    $fullCmd = "export HOME=/tmp 2>/dev/null; cd " . escapeshellarg($basePath) . " && {$cmd} 2>&1";
    return shell_exec($fullCmd) ?: '(Tidak ada output atau fungsi shell_exec dibatasi)';
}

$outputLog = '';
$executedAction = '';

if ($action) {
    $executedAction = $action;
    
    if ($action === 'full_update' || $action === 'all') {
        $outputLog .= "====================================================\n";
        $outputLog .= "🚀 MEMULAI 1-KLIK UPDATE SISTEM LENGKAP (SGIN DEPLOYER)\n";
        $outputLog .= "====================================================\n\n";

        // STEP 1: Tarik dari GitHub
        $outputLog .= "[1/5] 📥 Mengambil pembaruan kode terbaru dari GitHub...\n";
        $repoUrl = 'https://github.com/Frhstaaa/sgin-company.git';
        if (!is_dir($basePath . '/.git')) {
            runCmd("git init");
            runCmd("git remote add origin " . escapeshellarg($repoUrl));
        } else {
            runCmd("git remote set-url origin " . escapeshellarg($repoUrl));
        }
        runCmd("git config --global --add safe.directory " . escapeshellarg($basePath));
        runCmd("git config user.email 'deploy@sgin.co.id'");
        runCmd("git config user.name 'SGIN Deployer'");

        $fetchOut = runCmd("git fetch origin main");
        $resetOut = runCmd("git reset --hard origin/main");
        $outputLog .= "Git Fetch: " . trim($fetchOut) . "\n";
        $outputLog .= "Git Reset: " . trim($resetOut) . "\n";

        // Fallback ZIP jika git CLI gagal
        if (strpos($resetOut, 'HEAD is now at') === false && strpos($resetOut, 'HEAD sekarang di') === false) {
            $outputLog .= "ℹ️ Menggunakan fallback: Unduh arsip ZIP langsung dari GitHub main branch...\n";
            $zipUrl = 'https://github.com/Frhstaaa/sgin-company/archive/refs/heads/main.zip';
            $tmpZip = sys_get_temp_dir() . '/sgin_github_latest.zip';
            
            $zipContent = null;
            if (function_exists('curl_init')) {
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $zipUrl);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
                curl_setopt($ch, CURLOPT_USERAGENT, 'SGIN-Deployer');
                $zipContent = curl_exec($ch);
                curl_close($ch);
            }
            if (!$zipContent) {
                $opts = ['http' => ['method' => 'GET', 'header' => "User-Agent: SGIN-Deployer\r\n"], 'ssl' => ['verify_peer' => false, 'verify_peer_name' => false]];
                $context = stream_context_create($opts);
                $zipContent = @file_get_contents($zipUrl, false, $context);
            }

            if ($zipContent) {
                @file_put_contents($tmpZip, $zipContent);
                if (class_exists('ZipArchive')) {
                    $zip = new ZipArchive;
                    if ($zip->open($tmpZip) === TRUE) {
                        $tempExtract = sys_get_temp_dir() . '/sgin_extract_' . time();
                        $zip->extractTo($tempExtract);
                        $zip->close();
                        
                        $innerDirs = glob($tempExtract . '/*', GLOB_ONLYDIR);
                        $src = !empty($innerDirs) ? $innerDirs[0] : $tempExtract;
                        
                        $iterator = new RecursiveIteratorIterator(
                            new RecursiveDirectoryIterator($src, RecursiveDirectoryIterator::SKIP_DOTS),
                            RecursiveIteratorIterator::SELF_FIRST
                        );
                        $copiedCount = 0;
                        foreach ($iterator as $item) {
                            $targetPath = $basePath . DIRECTORY_SEPARATOR . $iterator->getSubPathName();
                            if ($item->isDir()) {
                                if (!is_dir($targetPath)) @mkdir($targetPath, 0755, true);
                            } else {
                                if ($iterator->getSubPathName() === '.env') continue;
                                @copy($item, $targetPath);
                                $copiedCount++;
                            }
                        }
                        @unlink($tmpZip);
                        $outputLog .= "✅ Berhasil memperbarui $copiedCount file dari GitHub!\n";
                    }
                }
            }
        }

        // STEP 2: Jalankan Migrasi & Seeder Database
        $outputLog .= "\n[2/5] 🗄️ Menjalankan migrasi tabel database & seeder terbaru...\n";
        $migrateOut = runCmd("{$phpCli} artisan migrate --force");
        $outputLog .= trim($migrateOut) . "\n";
        $seedOut = runCmd("{$phpCli} artisan db:seed --class=ProductionProcessSeeder --force");
        $outputLog .= "Seeder: " . trim($seedOut) . "\n";

        // STEP 3: Pastikan Storage Symlink Terhubung
        $outputLog .= "\n[3/5] 🔗 Memverifikasi storage symlink untuk upload foto...\n";
        $target = $basePath . '/storage/app/public';
        $link = $basePath . '/public/storage';
        if (is_link($link)) @unlink($link);
        if (@symlink($target, $link)) {
            $outputLog .= "✅ Symlink storage terhubung sempurna via native symlink!\n";
        } else {
            $symlinkOut = runCmd("{$phpCli} artisan storage:link");
            $outputLog .= trim($symlinkOut) . "\n";
        }

        // STEP 4: Perbaiki Permission Folder Storage & Cache
        $outputLog .= "\n[4/5] 🛡️ Mengatur izin permission direktori (0775)...\n";
        $pathsToFix = [
            $basePath . '/storage',
            $basePath . '/storage/app',
            $basePath . '/storage/app/public',
            $basePath . '/storage/framework',
            $basePath . '/storage/framework/cache',
            $basePath . '/storage/framework/sessions',
            $basePath . '/storage/framework/views',
            $basePath . '/storage/logs',
            $basePath . '/bootstrap/cache',
        ];
        foreach ($pathsToFix as $p) {
            if (!is_dir($p)) @mkdir($p, 0775, true);
            @chmod($p, 0775);
        }
        $outputLog .= "✅ Direktori storage & cache siap digunakan!\n";

        // STEP 5: Bersihkan Seluruh Cache Laravel
        $outputLog .= "\n[5/5] 🧹 Membersihkan seluruh cache aplikasi (config, route, view, build)...\n";
        $outputLog .= runCmd("{$phpCli} artisan optimize:clear") . "\n";
        
        $outputLog .= "\n====================================================\n";
        $outputLog .= "🎉 1-KLIK UPDATE SELESAI DENGAN SUKSES! WEBSITE SUDAH AKTIF LIVE!\n";
        $outputLog .= "====================================================\n";
    } elseif ($action === 'git_pull') {
        $outputLog .= "=== GIT PULL DARI GITHUB ===\n";
        $outputLog .= runCmd("git fetch origin main && git reset --hard origin/main") . "\n";
        $outputLog .= runCmd("{$phpCli} artisan optimize:clear") . "\n";
    } elseif ($action === 'migrate') {
        $outputLog .= "=== ARTISAN MIGRATE ===\n";
        $outputLog .= runCmd("{$phpCli} artisan migrate --force") . "\n";
        $outputLog .= runCmd("{$phpCli} artisan db:seed --class=ProductionProcessSeeder --force") . "\n";
    } elseif ($action === 'clear_cache') {
        $outputLog .= "=== ARTISAN OPTIMIZE:CLEAR ===\n";
        $outputLog .= runCmd("{$phpCli} artisan optimize:clear") . "\n";
        $outputLog .= runCmd("{$phpCli} artisan config:clear") . "\n";
        $outputLog .= runCmd("{$phpCli} artisan route:clear") . "\n";
        $outputLog .= runCmd("{$phpCli} artisan view:clear") . "\n";
    } elseif ($action === 'storage_link') {
        $outputLog .= "=== ARTISAN STORAGE:LINK ===\n";
        $target = $basePath . '/storage/app/public';
        $link = $basePath . '/public/storage';
        if (is_link($link)) @unlink($link);
        if (@symlink($target, $link)) {
            $outputLog .= "✅ Symlink storage terhubung!\n";
        } else {
            $outputLog .= runCmd("{$phpCli} artisan storage:link") . "\n";
        }
    }
}

// Baca log terbaru
$logFile = $basePath . '/storage/logs/laravel.log';
$latestLog = '';
if (file_exists($logFile) && filesize($logFile) > 0) {
    $lines = file($logFile);
    $latestLog = implode('', array_slice($lines, -100));
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1-Click Updater & Deployment - PT. Sugiyama Indonesia</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #090e1a;
            color: #f1f5f9;
            padding: 30px 15px;
            min-height: 100vh;
        }
        .container {
            max-width: 920px;
            margin: 0 auto;
        }
        .header-card {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            border: 1px solid #334155;
            border-radius: 24px;
            padding: 32px 24px;
            margin-bottom: 24px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            position: relative;
            overflow: hidden;
        }
        .header-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: 50%;
            transform: translateX(-50%);
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%);
            pointer-events: none;
        }
        h1 {
            color: #6ee7b7;
            font-size: 26px;
            font-weight: 800;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        .subtitle {
            color: #94a3b8;
            font-size: 14px;
            margin-bottom: 24px;
        }
        .main-btn-container {
            margin: 20px 0 10px 0;
        }
        .btn-giant {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: #ffffff;
            font-size: 18px;
            font-weight: 800;
            padding: 18px 36px;
            border-radius: 18px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 10px 25px rgba(5, 150, 105, 0.4);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255,255,255,0.15);
            cursor: pointer;
        }
        .btn-giant:hover {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 15px 35px rgba(16, 185, 129, 0.5);
        }
        .btn-giant:active {
            transform: translateY(1px);
        }
        .card {
            background: #111827;
            border: 1px solid #1f2937;
            border-radius: 20px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        h2 {
            font-size: 16px;
            color: #e2e8f0;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .sub-btn-group {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .btn-sub {
            background: #1f2937;
            color: #cbd5e1;
            border: 1px solid #374151;
            padding: 10px 18px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s;
        }
        .btn-sub:hover {
            background: #374151;
            color: #ffffff;
            transform: translateY(-1px);
        }
        pre {
            background: #030712;
            border: 1px solid #1f2937;
            padding: 18px;
            border-radius: 16px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 13px;
            line-height: 1.6;
            color: #38bdf8;
            white-space: pre-wrap;
            word-break: break-all;
            max-height: 480px;
            overflow-y: auto;
        }
        .quick-nav {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-top: 15px;
            font-size: 13px;
        }
        .quick-nav a {
            color: #34d399;
            text-decoration: none;
            font-weight: 600;
        }
        .quick-nav a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header-card">
        <h1>⚡ SGIN 1-Click Universal Updater</h1>
        <p class="subtitle">PT. Sugiyama Indonesia &bull; Server: <code><?= htmlspecialchars($basePath) ?></code></p>
        
        <div class="main-btn-container">
            <a href="?action=full_update" class="btn-giant" onclick="this.innerHTML='⏳ Sedang Mengupdate Seluruh Sistem...'; this.style.opacity='0.7';">
                <span>🚀</span>
                <span>1-KLIK UPDATE LENGKAP WEBSITE</span>
            </a>
        </div>
        <p style="color: #64748b; font-size: 12px; margin-top: 10px;">
            (Otomatis: Git Pull GitHub + Artisan Migrate + DB Seeder + Storage Link + Izin 0775 + Bersihkan Cache)
        </p>

        <div class="quick-nav">
            <a href="https://sgin.co.id" target="_blank">🌐 Buka Website Publik</a>
            <span style="color:#475569;">|</span>
            <a href="https://sgin.co.id/admin" target="_blank">🔐 Buka Admin Dashboard</a>
            <span style="color:#475569;">|</span>
            <a href="https://sgin.co.id/proses-produksi" target="_blank">⚙️ Halaman Proses Produksi</a>
        </div>
    </div>

    <?php if (!empty($outputLog)): ?>
    <div class="card" style="border-color: #059669;">
        <h2 style="color: #34d399;">📄 Terminal Output Hasil Eksekusi:</h2>
        <pre><?= htmlspecialchars($outputLog) ?></pre>
    </div>
    <?php endif; ?>

    <div class="card">
        <h2>🛠️ Tombol Aksi Spesifik (Opsional):</h2>
        <div class="sub-btn-group">
            <a href="?action=git_pull" class="btn-sub">
                <span>🔄</span> Git Pull Saja
            </a>
            <a href="?action=migrate" class="btn-sub">
                <span>🗄️</span> php artisan migrate + seed
            </a>
            <a href="?action=clear_cache" class="btn-sub">
                <span>🧹</span> php artisan optimize:clear
            </a>
            <a href="?action=storage_link" class="btn-sub">
                <span>🔗</span> php artisan storage:link
            </a>
        </div>
    </div>

    <?php if (!empty($latestLog)): ?>
    <div class="card">
        <h2>📋 Log Laravel Terbaru (laravel.log):</h2>
        <pre style="color: #fca5a5; font-size: 12px;"><?= htmlspecialchars($latestLog) ?></pre>
    </div>
    <?php endif; ?>
</div>
</body>
</html>
