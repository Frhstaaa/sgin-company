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
    $fullCmd = "export HOME=/tmp 2>/dev/null; cd " . escapeshellarg($basePath) . " && {$cmd} 2>&1";
    return shell_exec($fullCmd) ?: '(Tidak ada output atau fungsi shell_exec dibatasi)';
}

if ($action === 'git_pull') {
    $outputLog .= "=== UPDATE DARI GITHUB REPOSITORY ===\n";
    $repoUrl = 'https://github.com/Frhstaaa/sgin-company.git';
    
    // Inisialisasi repo jika belum ada .git
    if (!is_dir($basePath . '/.git')) {
        $outputLog .= "ℹ️ Menginisialisasi repositori Git di folder proyek...\n";
        $outputLog .= runCmd("git init") . "\n";
        $outputLog .= runCmd("git remote add origin " . escapeshellarg($repoUrl)) . "\n";
    } else {
        runCmd("git remote set-url origin " . escapeshellarg($repoUrl));
    }
    
    $outputLog .= runCmd("git config --global --add safe.directory " . escapeshellarg($basePath)) . "\n";
    $outputLog .= runCmd("git config user.email 'deploy@sgin.co.id'") . "\n";
    $outputLog .= runCmd("git config user.name 'SGIN Deployer'") . "\n";
    $outputLog .= "Mengambil data commit terbaru dari GitHub...\n";
    $fetchOut = runCmd("git fetch origin main");
    $outputLog .= $fetchOut . "\n";
    $resetOut = runCmd("git reset --hard origin/main");
    $outputLog .= $resetOut . "\n";
    
    // Jika git CLI gagal atau terkendala permission, fallback download zip
    if (strpos($resetOut, 'HEAD is now at') === false && strpos($resetOut, 'HEAD sekarang di') === false) {
        $outputLog .= "\nℹ️ Mencoba metode cadangan: Unduh langsung ZIP arsip dari GitHub...\n";
        $zipUrl = 'https://github.com/Frhstaaa/sgin-company/archive/refs/heads/main.zip';
        $tmpZip = sys_get_temp_dir() . '/sgin_github_latest.zip';
        
        $opts = [
            'http' => [
                'method' => 'GET',
                'header' => "User-Agent: SGIN-Deployer\r\n"
            ]
        ];
        $context = stream_context_create($opts);
        $zipContent = @file_get_contents($zipUrl, false, $context);
        
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
                    $outputLog .= "✅ Berhasil memperbarui $copiedCount file langsung dari GitHub main branch!\n";
                }
            }
        }
    }
    
    $outputLog .= "Membersihkan cache aplikasi...\n";
    $outputLog .= runCmd("{$phpCli} artisan optimize:clear") . "\n";
    $outputLog .= "✅ Proses update dari GitHub selesai!\n";
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
    $envFile = $basePath . '/.env';
    $envExample = $basePath . '/.env.example';
    
    if (!file_exists($envFile)) {
        if (file_exists($envExample)) {
            @copy($envExample, $envFile);
            $outputLog .= "ℹ️ File .env otomatis dibuat dari .env.example\n";
        } else {
            @file_put_contents($envFile, "APP_NAME=\"PT. Sugiyama Indonesia\"\nAPP_ENV=production\nAPP_KEY=\nAPP_DEBUG=false\nAPP_URL=https://sgin.co.id\n");
            $outputLog .= "ℹ️ File .env baru dibuat\n";
        }
    }
    
    $envContent = @file_get_contents($envFile) ?: '';
    if (strpos($envContent, 'APP_KEY=') === false) {
        $envContent = "APP_KEY=\n" . $envContent;
        @file_put_contents($envFile, $envContent);
        $outputLog .= "ℹ️ Baris APP_KEY= ditambahkan ke .env\n";
    }
    
    $outputLog .= runCmd("{$phpCli} artisan key:generate --force") . "\n";
} elseif ($action === 'clear_cache') {
    $outputLog .= "=== BERSIHKAN SEMUA CACHE ===\n";
    $outputLog .= runCmd("{$phpCli} artisan optimize:clear") . "\n";
    $outputLog .= runCmd("{$phpCli} artisan config:clear") . "\n";
    $outputLog .= runCmd("{$phpCli} artisan route:clear") . "\n";
    $outputLog .= runCmd("{$phpCli} artisan view:clear") . "\n";
} elseif ($action === 'remove_maintenance_html') {
    $outputLog .= "=== HAPUS FILE MAINTENANCE (index.html) ===\n";
    $candidates = ['index.html', 'index.htm', 'default.html', 'maintenance.html'];
    $found = false;
    foreach ($candidates as $candidate) {
        $p = $basePath . '/' . $candidate;
        if (file_exists($p)) {
            if (@unlink($p)) {
                $outputLog .= "✅ Berhasil menghapus file lama: $candidate\n";
            } else {
                $outputLog .= "⚠️ Gagal menghapus $candidate via PHP unlink\n";
            }
            $found = true;
        }
    }
    if (!$found) {
        $outputLog .= "ℹ️ Tidak ditemukan file index.html atau maintenance lama di folder root.\n";
    }
} elseif ($action === 'fix_htaccess') {
    $outputLog .= "=== PASANG / PERBAIKI .HTACCESS ROOT ===\n";
    $htaccessPath = $basePath . '/.htaccess';
    $htaccessContent = "<IfModule mod_rewrite.c>\n    RewriteEngine On\n\n    # Prioritize Laravel public index.php\n    DirectoryIndex public/index.php index.php\n\n    # 1. Block access to sensitive files and directories\n    RewriteRule ^\\.(env|git|editorconfig|gitignore|gitattributes) - [F,L,NC]\n    RewriteRule ^(app|bootstrap|config|database|resources|routes|storage|tests|vendor)/(.*) - [F,L,NC]\n    RewriteRule ^(composer\\.(json|lock)|package(-lock)?\\.json|phpunit\\.xml|vite\\.config\.js) - [F,L,NC]\n\n    # 2. Redirect all traffic to the public directory\n    RewriteCond %{REQUEST_URI} !^/public/\n    RewriteRule ^(.*)$ public/$1 [L]\n</IfModule>\n";
    if (@file_put_contents($htaccessPath, $htaccessContent)) {
        $outputLog .= "✅ File .htaccess di root berhasil diperbarui!\n";
    } else {
        $outputLog .= "❌ Gagal menulis .htaccess (periksa permission folder)\n";
    }
} elseif ($action === 'fix_permissions') {
    $outputLog .= "=== PERBAIKI PERMISSION STORAGE & BOOTSTRAP ===\n";
    $folders = ['storage', 'storage/app', 'storage/app/public', 'storage/framework', 'storage/framework/cache', 'storage/framework/cache/data', 'storage/framework/sessions', 'storage/framework/views', 'storage/logs', 'bootstrap/cache'];
    foreach ($folders as $f) {
        $p = $basePath . '/' . $f;
        if (!is_dir($p)) {
            @mkdir($p, 0775, true);
        }
        @chmod($p, 0775);
    }
    $outputLog .= "✅ Permission direktori storage dan cache berhasil diatur ke 0775\n";
}

// Cek status environment
$hasEnv = file_exists($basePath . '/.env');
$hasStorageLink = is_link($basePath . '/public/storage') || is_dir($basePath . '/public/storage');
$hasBuild = is_dir($basePath . '/public/build');
$hasVendor = is_dir($basePath . '/vendor');
$hasIndexHtml = file_exists($basePath . '/index.html') || file_exists($basePath . '/index.htm');
$hasRootHtaccess = file_exists($basePath . '/.htaccess');
$phpVersion = PHP_VERSION;
$requiredExtensions = ['openssl', 'pdo', 'pdo_mysql', 'mbstring', 'tokenizer', 'xml', 'ctype', 'json', 'fileinfo', 'gd'];
$missingExtensions = [];
foreach ($requiredExtensions as $ext) {
    if (!extension_loaded($ext)) {
        $missingExtensions[] = $ext;
    }
}

// Baca log terbaru jika ada
$logFile = $basePath . '/storage/logs/laravel.log';
$latestLog = '';
if (file_exists($logFile) && filesize($logFile) > 0) {
    $lines = file($logFile);
    $latestLog = implode('', array_slice($lines, -50));
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

        <?php if ($hasIndexHtml): ?>
            <div style="background:rgba(245,158,11,0.15);border:1px solid #f59e0b;padding:14px;border-radius:10px;margin-bottom:15px;color:#fde68a;font-size:13px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
                <div>
                    ⚠️ <strong>Ditemukan file index.html lama di root folder (Halaman Maintenance)!</strong><br>
                    File ini membuat web menampilkan tulisan "Under Maintenance" dan menghalangi Laravel.
                </div>
                <a href="?token=<?= $secretToken ?>&action=remove_maintenance_html" class="btn btn-amber" style="margin:0;">
                    🗑️ Hapus index.html Maintenance
                </a>
            </div>
        <?php endif; ?>

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
            <a href="?token=<?= $secretToken ?>&action=fix_htaccess" class="btn btn-slate">
                🛠️ Perbaiki .htaccess Root
            </a>
            <a href="?token=<?= $secretToken ?>&action=remove_maintenance_html" class="btn btn-slate">
                🗑️ Hapus index.html Lama
            </a>
            <a href="?token=<?= $secretToken ?>&action=fix_permissions" class="btn btn-slate">
                🛡️ Perbaiki Permission Folder
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

    <?php if (!empty($latestLog)): ?>
    <div class="card">
        <h2>📋 Log Error Laravel Terbaru (laravel.log):</h2>
        <pre style="color:#fca5a5;font-size:12px;"><?= htmlspecialchars($latestLog) ?></pre>
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
