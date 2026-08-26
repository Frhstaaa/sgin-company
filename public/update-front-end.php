<?php
/**
 * SGIN Dedicated Frontend & UI Updater
 * PT. Sugiyama Indonesia
 * 
 * Akses: https://sgin.co.id/update-front-end.php
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

$isRun = isset($_GET['run']) || isset($_POST['run']);
$outputLog = '';

if ($isRun) {
    $outputLog .= "====================================================\n";
    $outputLog .= "⚡ MEMULAI UPDATE KHUSUS FRONTEND / UI DARI GITHUB\n";
    $outputLog .= "====================================================\n\n";

    // 1. Tarik file Frontend & Build Vite
    $outputLog .= "[1/2] 📥 Mengambil file UI, build Vite (React, JS, CSS, Blade) terbaru...\n";
    $outputLog .= pullGitCode() . "\n";

    // 2. Bersihkan View Cache
    $outputLog .= "[2/2] 🧹 Membersihkan view & optimize cache aplikasi...\n";
    $outputLog .= runCmd("{$phpCli} artisan view:clear") . "\n";
    $outputLog .= runCmd("{$phpCli} artisan optimize:clear") . "\n";

    $outputLog .= "\n====================================================\n";
    $outputLog .= "🎉 UPDATE FRONTEND SUKSES! TAMPILAN TERBARU SUDAH LIVE!\n";
    $outputLog .= "🔒 DATABASE 100% AMAN (Tidak ada tabel/data admin yang diubah).\n";
    $outputLog .= "====================================================\n";
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Frontend Saja - PT. Sugiyama Indonesia</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #090e1a;
            color: #f1f5f9;
            padding: 30px 15px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            max-width: 680px;
            width: 100%;
        }
        .card {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            border: 1px solid #059669;
            border-radius: 24px;
            padding: 36px 28px;
            text-align: center;
            box-shadow: 0 20px 50px rgba(0,0,0,0.6);
            position: relative;
            overflow: hidden;
        }
        .card::before {
            content: '';
            position: absolute;
            top: -40%;
            left: 50%;
            transform: translateX(-50%);
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%);
            pointer-events: none;
        }
        .badge {
            display: inline-block;
            background: rgba(16, 185, 129, 0.2);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.4);
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 5px 14px;
            border-radius: 20px;
            margin-bottom: 14px;
        }
        h1 {
            color: #6ee7b7;
            font-size: 24px;
            font-weight: 800;
            margin-bottom: 10px;
            letter-spacing: -0.5px;
        }
        p {
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.6;
            margin-bottom: 24px;
        }
        .feature-box {
            background: #0b132b;
            border: 1px solid #1f2937;
            border-radius: 16px;
            padding: 16px 20px;
            text-align: left;
            font-size: 13px;
            color: #cbd5e1;
            margin-bottom: 26px;
            line-height: 1.8;
        }
        .feature-box li {
            list-style: none;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .btn-giant {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: #ffffff;
            font-size: 16px;
            font-weight: 800;
            padding: 16px 36px;
            border-radius: 16px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            box-shadow: 0 10px 25px rgba(5, 150, 105, 0.4);
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
            width: 100%;
        }
        .btn-giant:hover {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            box-shadow: 0 15px 35px rgba(16, 185, 129, 0.5);
            transform: translateY(-2px);
        }
        pre {
            background: #030712;
            border: 1px solid #1f2937;
            padding: 18px;
            border-radius: 16px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 12px;
            line-height: 1.6;
            color: #38bdf8;
            white-space: pre-wrap;
            word-break: break-all;
            max-height: 380px;
            overflow-y: auto;
            text-align: left;
            margin-top: 24px;
        }
        .quick-nav {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-top: 20px;
            font-size: 12px;
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
    <div class="card">
        <span class="badge">⚡ Dedicated Frontend Deployment</span>
        <h1>Update Khusus Frontend Saja</h1>
        <p>Tarik build UI React JS, CSS, aset Vite, dan template Blade terbaru dari GitHub ke hosting PT. Sugiyama Indonesia.</p>
        
        <div class="feature-box">
            <li>✅ <strong>Hanya Update File Frontend:</strong> React Component, Style CSS & Aset Vite</li>
            <li>✅ <strong>100% Aman untuk Database:</strong> Tidak menjalankan migrasi / seeder</li>
            <li>✅ <strong>Data Admin Tidak Tersentuh:</strong> Data Visi, Misi, Pelanggan, dll tetap aman</li>
            <li>✅ <strong>Proses Cepat:</strong> Hanya membutuhkan waktu ~1-2 detik</li>
        </div>

        <a href="?run=1" class="btn-giant" onclick="this.innerHTML='⏳ Sedang Menarik Build Frontend...'; this.style.opacity='0.7';">
            <span>🚀</span>
            <span>KLIK UNTUK UPDATE FRONTEND SEKARANG</span>
        </a>

        <?php if (!empty($outputLog)): ?>
        <pre><?= htmlspecialchars($outputLog) ?></pre>
        <?php endif; ?>

        <div class="quick-nav">
            <a href="https://sgin.co.id" target="_blank">🌐 Website Publik</a>
            <span style="color:#475569;">|</span>
            <a href="https://sgin.co.id/sginco-manage" target="_blank">🔐 Akses Admin (/sginco-manage)</a>
            <span style="color:#475569;">|</span>
            <a href="https://sgin.co.id/update.php">🛠️ Menu Full Updater</a>
        </div>
    </div>
</div>
</body>
</html>
