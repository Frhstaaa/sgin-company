<?php
/**
 * SGIN 1-Click Universal System & Frontend Updater
 * PT. Sugiyama Indonesia
 * 
 * Akses: https://sgin.co.id/update.php
 */

ini_set('display_errors', 1);
error_reporting(E_ALL);
set_time_limit(300);

// Smart BasePath Detection
if (file_exists(__DIR__ . '/artisan')) {
    $basePath = __DIR__;
} elseif (file_exists(dirname(__DIR__) . '/artisan')) {
    $basePath = dirname(__DIR__);
} else {
    $basePath = __DIR__;
}

$repoUrl = 'https://github.com/Frhstaaa/sgin-company.git';
$zipUrl = 'https://github.com/Frhstaaa/sgin-company/archive/refs/heads/main.zip';

// Auto detect CLI PHP path
$phpCli = 'php';
$possiblePhps = [
    '/usr/local/bin/ea-php83',
    '/usr/local/bin/ea-php82',
    '/usr/local/lsws/lsphp83/bin/php',
    '/usr/local/lsws/lsphp82/bin/php',
    '/opt/cpanel/ea-php83/root/usr/bin/php',
    '/opt/cpanel/ea-php82/root/usr/bin/php',
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
    $res = @shell_exec($fullCmd);
    return $res !== null ? trim($res) : '(Tidak ada output atau fungsi shell_exec dibatasi)';
}

function pullGitCode() {
    global $basePath, $repoUrl, $zipUrl;
    $output = "";
    
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
    $output .= "Git Fetch: " . trim($fetchOut) . "\n";
    $output .= "Git Reset: " . trim($resetOut) . "\n";

    // Fallback ZIP jika git CLI gagal
    if (strpos($resetOut, 'HEAD is now at') === false && strpos($resetOut, 'HEAD sekarang di') === false) {
        $output .= "ℹ️ Menggunakan fallback: Unduh arsip ZIP langsung dari GitHub main branch...\n";
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
                    $output .= "✅ Berhasil memperbarui $copiedCount file dari GitHub!\n";
                }
            }
        }
    }
    return $output;
}

$action = $_GET['action'] ?? ($_GET['run'] ?? '');
$outputLog = '';

if ($action) {
    if ($action === 'frontend_only' || $action === 'frontend' || $action === 'ui' || $action === '1') {
        // ==========================================
        // 1. UPDATE FRONTEND / TAMPILAN SAJA
        // ==========================================
        $outputLog .= "====================================================\n";
        $outputLog .= "⚡ MEMULAI UPDATE FRONTEND & TAMPILAN (DATABASE AMAN)\n";
        $outputLog .= "====================================================\n\n";

        $outputLog .= "[1/2] 📥 Mengambil file UI, build Vite & React terbaru dari GitHub...\n";
        $outputLog .= pullGitCode() . "\n";

        $outputLog .= "[2/2] 🧹 Membersihkan view cache aplikasi...\n";
        $outputLog .= runCmd("{$phpCli} artisan view:clear") . "\n";
        $outputLog .= runCmd("{$phpCli} artisan optimize:clear") . "\n";

        $outputLog .= "\n====================================================\n";
        $outputLog .= "🎉 UPDATE FRONTEND SUKSES! TAMPILAN WEBSITE SUDAH DIPERBARUI.\n";
        $outputLog .= "ℹ️ Catatan: Database & data admin Anda 100% utuh tanpa perubahan.\n";
        $outputLog .= "====================================================\n";

    } elseif ($action === 'full_update' || $action === 'full' || $action === 'all') {
        // ==========================================
        // 2. FULL UPDATE SISTEM & DATABASE
        // ==========================================
        $outputLog .= "====================================================\n";
        $outputLog .= "🚀 MEMULAI FULL UPDATE SISTEM (KODE + DATABASE)\n";
        $outputLog .= "====================================================\n\n";

        $outputLog .= "[1/5] 📥 Mengambil seluruh kode terbaru dari GitHub...\n";
        $outputLog .= pullGitCode() . "\n";

        $outputLog .= "[2/5] 🗄️ Menjalankan migrasi tabel database...\n";
        $migrateOut = runCmd("{$phpCli} artisan migrate --force");
        $outputLog .= trim($migrateOut) . "\n";

        $outputLog .= "\n[3/5] 🔗 Memverifikasi storage symlink untuk upload foto...\n";
        $target = $basePath . '/storage/app/public';
        $link = $basePath . '/public/storage';
        if (is_link($link)) @unlink($link);
        if (@symlink($target, $link)) {
            $outputLog .= "✅ Symlink storage terhubung sempurna!\n";
        } else {
            $outputLog .= runCmd("{$phpCli} artisan storage:link") . "\n";
        }

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

        $outputLog .= "\n[5/5] 🧹 Membersihkan seluruh cache Laravel...\n";
        $outputLog .= runCmd("{$phpCli} artisan optimize:clear") . "\n";

        $outputLog .= "\n====================================================\n";
        $outputLog .= "🎉 FULL UPDATE SISTEM SELESAI DENGAN SUKSES!\n";
        $outputLog .= "====================================================\n";

    } elseif ($action === 'git_pull') {
        $outputLog .= "=== GIT PULL DARI GITHUB ===\n";
        $outputLog .= pullGitCode() . "\n";
        $outputLog .= runCmd("{$phpCli} artisan optimize:clear") . "\n";
    } elseif ($action === 'clear_cache') {
        $outputLog .= "=== BERSIHKAN CACHE ===\n";
        $outputLog .= runCmd("{$phpCli} artisan optimize:clear") . "\n";
        $outputLog .= runCmd("{$phpCli} artisan view:clear") . "\n";
        $outputLog .= runCmd("{$phpCli} artisan config:clear") . "\n";
        $outputLog .= runCmd("{$phpCli} artisan route:clear") . "\n";
    } elseif ($action === 'storage_link') {
        $outputLog .= "=== REFRESH STORAGE SYMLINK ===\n";
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

// Baca log error terbaru jika ada
$logFile = $basePath . '/storage/logs/laravel.log';
$latestLog = '';
if (file_exists($logFile) && filesize($logFile) > 0) {
    $lines = file($logFile);
    $latestLog = implode('', array_slice($lines, -60));
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SGIN Website Updater - PT. Sugiyama Indonesia</title>
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
            max-width: 900px;
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
            width: 320px;
            height: 320px;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
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
        
        .action-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 16px;
            margin: 20px 0;
            text-align: left;
        }
        
        .action-box {
            background: #111827;
            border: 1px solid #1f2937;
            border-radius: 20px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.25s ease;
        }
        .action-box:hover {
            border-color: #3b82f6;
            transform: translateY(-2px);
        }
        .action-box.highlight {
            border-color: #059669;
            background: linear-gradient(180deg, #0b1f1a 0%, #111827 100%);
        }
        .action-box.highlight:hover {
            border-color: #10b981;
        }

        .badge {
            display: inline-block;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 4px 10px;
            border-radius: 20px;
            margin-bottom: 12px;
            width: fit-content;
        }
        .badge-green { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
        .badge-blue { background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }

        .action-title {
            font-size: 18px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 8px;
        }
        .action-desc {
            font-size: 13px;
            color: #94a3b8;
            line-height: 1.5;
            margin-bottom: 20px;
        }

        .btn-action {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            padding: 15px 24px;
            border-radius: 14px;
            font-size: 15px;
            font-weight: 800;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
        }
        .btn-green {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: #ffffff;
            box-shadow: 0 8px 20px rgba(5, 150, 105, 0.4);
        }
        .btn-green:hover {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            box-shadow: 0 12px 25px rgba(16, 185, 129, 0.5);
            transform: translateY(-2px);
        }
        .btn-blue {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: #ffffff;
            box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
        }
        .btn-blue:hover {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            box-shadow: 0 12px 25px rgba(59, 130, 246, 0.5);
            transform: translateY(-2px);
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
        <h1>⚡ SGIN 1-Click Website Updater</h1>
        <p class="subtitle">PT. Sugiyama Indonesia &bull; Server: <code><?= htmlspecialchars($basePath) ?></code></p>
        
        <div class="action-cards">
            <!-- OPSI 1: UPDATE FRONTEND SAJA (RECOMMENDED) -->
            <div class="action-box highlight">
                <div>
                    <span class="badge badge-green">⚡ Rekomendasi & Tercepat</span>
                    <div class="action-title">Update Frontend Saja</div>
                    <div class="action-desc">
                        Hanya memperbarui file UI, React JS, CSS, aset Vite, dan Blade dari GitHub. <strong>100% aman untuk database & data Admin Anda tidak akan tersentuh.</strong>
                    </div>
                </div>
                <a href="?action=frontend_only" class="btn-action btn-green" onclick="this.innerHTML='⏳ Sedang Mengupdate UI...'; this.style.opacity='0.7';">
                    <span>⚡</span>
                    <span>Update Frontend Saja</span>
                </a>
            </div>

            <!-- OPSI 2: FULL UPDATE SISTEM -->
            <div class="action-box">
                <div>
                    <span class="badge badge-blue">🚀 Full Deployment</span>
                    <div class="action-title">Full Update Sistem</div>
                    <div class="action-desc">
                        Memperbarui seluruh kode program dan menjalankan migrasi database serta konfigurasi symlink storage.
                    </div>
                </div>
                <a href="?action=full_update" class="btn-action btn-blue" onclick="this.innerHTML='⏳ Sedang Full Update...'; this.style.opacity='0.7';">
                    <span>🚀</span>
                    <span>Full Update Sistem</span>
                </a>
            </div>
        </div>

        <div class="quick-nav">
            <a href="https://sgin.co.id" target="_blank">🌐 Buka Website Publik</a>
            <span style="color:#475569;">|</span>
            <a href="https://sgin.co.id/admin" target="_blank">🔐 Buka Admin Dashboard</a>
            <span style="color:#475569;">|</span>
            <a href="https://sgin.co.id/tentang-kami" target="_blank">🏢 Halaman Tentang Kami</a>
        </div>
    </div>

    <?php if (!empty($outputLog)): ?>
    <div class="card" style="border-color: #059669;">
        <h2 style="color: #34d399;">📄 Terminal Output Hasil Update:</h2>
        <pre><?= htmlspecialchars($outputLog) ?></pre>
    </div>
    <?php endif; ?>

    <div class="card">
        <h2>🛠️ Tombol Aksi Spesifik (Opsional):</h2>
        <div class="sub-btn-group">
            <a href="?action=frontend_only" class="btn-sub">
                <span>⚡</span> Update Frontend Saja
            </a>
            <a href="?action=git_pull" class="btn-sub">
                <span>🔄</span> Git Pull Saja
            </a>
            <a href="?action=clear_cache" class="btn-sub">
                <span>🧹</span> Bersihkan Seluruh Cache (optimize:clear)
            </a>
            <a href="?action=storage_link" class="btn-sub">
                <span>🔗</span> Refresh Storage Symlink
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
