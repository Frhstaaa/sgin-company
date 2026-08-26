<?php
/**
 * SGIN 1-Click Complete System Deployer
 * PT. Sugiyama Indonesia
 * 
 * Akses di Browser: https://sgin.co.id/deploy.php
 */

ini_set('display_errors', 1);
error_reporting(E_ALL);
@set_time_limit(600);
@ini_set('max_execution_time', '600');

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

// Deteksi CLI PHP
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
    return $res !== null ? trim($res) : '(shell_exec tidak merespon / dibatasi)';
}

$isRun = isset($_GET['run']) || isset($_POST['run']);

if ($isRun) {
    ?>
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Deploying... PT. Sugiyama Indonesia</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Plus Jakarta Sans', sans-serif; }
            pre, code { font-family: 'JetBrains Mono', monospace; }
        </style>
    </head>
    <body class="bg-slate-950 text-slate-100 min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <div class="max-w-3xl w-full bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div class="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                    <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/30">Auto-Deployer Active</span>
                    <h1 class="text-2xl font-black text-white mt-2">Log Proses Deploy SGIN</h1>
                    <p class="text-xs text-slate-400">Target Folder: <code class="text-emerald-300"><?php echo htmlspecialchars($basePath); ?></code></p>
                </div>
                <div class="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xl">
                    🚀
                </div>
            </div>

            <div class="bg-black/90 rounded-2xl p-5 border border-slate-800 text-xs text-emerald-300 overflow-x-auto leading-relaxed max-h-[450px] overflow-y-auto font-mono whitespace-pre-wrap">
<?php
    echo "==========================================================\n";
    echo "🚀 MEMULAI DEPLOYMENT SGIN COMPANY PROFILE KE HOSTING\n";
    echo "   Repo: https://github.com/Frhstaaa/sgin-company.git\n";
    echo "   Base Path: {$basePath}\n";
    echo "   PHP CLI: {$phpCli}\n";
    echo "==========================================================\n\n";

    // 1. HAPUS FILE CACHE BERMASALAH DULU
    echo "[1/6] 🧹 Membersihkan file bootstrap cache lama...\n";
    $cacheDir = $basePath . '/bootstrap/cache';
    if (is_dir($cacheDir)) {
        foreach (glob($cacheDir . '/*.php') as $file) {
            @unlink($file);
            echo "   - Hapus cache: " . basename($file) . "\n";
        }
    }
    echo "   ✓ Bootstrap cache dibersihkan.\n\n";

    // 2. AMBIL KODE TERBARU DARI GITHUB
    echo "[2/6] 📥 Mengambil source code terbaru dari GitHub (main branch)...\n";
    $gitSuccess = false;
    if (function_exists('shell_exec')) {
        if (!is_dir($basePath . '/.git')) {
            runCmd("git init");
            runCmd("git remote add origin " . escapeshellarg($repoUrl));
        } else {
            runCmd("git remote set-url origin " . escapeshellarg($repoUrl));
        }
        runCmd("git config --global --add safe.directory " . escapeshellarg($basePath));
        $fetchOut = runCmd("git fetch origin main");
        $resetOut = runCmd("git reset --hard origin/main");
        echo "   Git Reset: " . $resetOut . "\n";

        if (strpos($resetOut, 'HEAD is now at') !== false || strpos($resetOut, 'HEAD sekarang di') !== false) {
            $gitSuccess = true;
            echo "   ✓ Kode berhasil diperbarui via Git CLI.\n\n";
        }
    }

    // Fallback ZIP jika Git CLI dibatasi cPanel
    if (!$gitSuccess) {
        echo "   ℹ️ Menggunakan metode ZIP Archive Download...\n";
        $tmpZip = sys_get_temp_dir() . '/sgin_company_latest.zip';
        $zipData = null;

        if (function_exists('curl_init')) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $zipUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($ch, CURLOPT_USERAGENT, 'SGIN-Deployer');
            $zipData = curl_exec($ch);
            curl_close($ch);
        }
        if (!$zipData) {
            $zipData = @file_get_contents($zipUrl);
        }

        if ($zipData && @file_put_contents($tmpZip, $zipData)) {
            if (class_exists('ZipArchive')) {
                $zip = new ZipArchive;
                if ($zip->open($tmpZip) === TRUE) {
                    $extractTo = sys_get_temp_dir() . '/sgin_extract_' . time();
                    $zip->extractTo($extractTo);
                    $zip->close();

                    $innerDirs = glob($extractTo . '/*', GLOB_ONLYDIR);
                    $src = !empty($innerDirs) ? $innerDirs[0] : $extractTo;

                    $iterator = new RecursiveIteratorIterator(
                        new RecursiveDirectoryIterator($src, RecursiveDirectoryIterator::SKIP_DOTS),
                        RecursiveIteratorIterator::SELF_FIRST
                    );
                    $count = 0;
                    foreach ($iterator as $item) {
                        $sub = $iterator->getSubPathName();
                        if ($sub === '.env') continue; // Jangan timpa .env database hosting
                        $target = $basePath . DIRECTORY_SEPARATOR . $sub;
                        if ($item->isDir()) {
                            if (!is_dir($target)) @mkdir($target, 0755, true);
                        } else {
                            @copy($item, $target);
                            $count++;
                        }
                    }
                    @unlink($tmpZip);
                    echo "   ✓ Berhasil mengekstrak {$count} file kodingan terbaru dari GitHub!\n\n";
                } else {
                    echo "   ⚠️ Gagal membuka arsip ZIP.\n\n";
                }
            } else {
                echo "   ⚠️ Ekstensi ZipArchive PHP tidak aktif di hosting.\n\n";
            }
        } else {
            echo "   ⚠️ Tidak dapat mengunduh ZIP dari GitHub.\n\n";
        }
    }

    // 3. STORAGE & PERMISSION FIX
    echo "[3/6] 🛡️ Memperbaiki permission folder storage & cache...\n";
    $folders = [
        $basePath . '/storage',
        $basePath . '/storage/app',
        $basePath . '/storage/app/public',
        $basePath . '/storage/framework',
        $basePath . '/storage/framework/cache',
        $basePath . '/storage/framework/cache/data',
        $basePath . '/storage/framework/sessions',
        $basePath . '/storage/framework/views',
        $basePath . '/storage/logs',
        $basePath . '/bootstrap/cache',
    ];
    foreach ($folders as $f) {
        if (!is_dir($f)) @mkdir($f, 0775, true);
        @chmod($f, 0775);
    }
    echo "   ✓ Permission storage & cache telah diset ke 0775.\n\n";

    // 4. STORAGE SYMLINK
    echo "[4/6] 🔗 Membuat symlink public/storage...\n";
    $targetPublic = $basePath . '/public/storage';
    $sourceStorage = $basePath . '/storage/app/public';
    if (is_link($targetPublic)) @unlink($targetPublic);
    if (@symlink($sourceStorage, $targetPublic)) {
        echo "   ✓ Symlink storage berhasil dibuat via PHP symlink().\n\n";
    } else {
        $symlinkOut = runCmd("{$phpCli} artisan storage:link");
        echo "   Artisan storage:link: " . $symlinkOut . "\n\n";
    }

    // 5. DATABASE MIGRATION & SEED
    echo "[5/6] 🗄️ Menjalankan migrasi database & default data...\n";
    $migOut = runCmd("{$phpCli} artisan migrate --force");
    echo "   Migrate: " . $migOut . "\n";
    $seedOut = runCmd("{$phpCli} artisan db:seed --force");
    echo "   DB Seed: " . $seedOut . "\n\n";

    // 6. CLEAR ALL CACHE & OPTIMIZE
    echo "[6/6] ⚡ Membersihkan seluruh cache Laravel...\n";
    $optClear = runCmd("{$phpCli} artisan optimize:clear");
    echo "   " . $optClear . "\n";

    echo "\n==========================================================\n";
    echo "🎉 PROSES SELESAI! SILAKAN BUKA WEBSITE SGIN SEKARANG.\n";
    echo "==========================================================\n";
?>
            </div>

            <div class="flex items-center justify-between pt-2">
                <a href="deploy.php" class="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors">
                    &larr; Kembali ke Deployer
                </a>
                <a href="./" class="px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-xl shadow-emerald-600/30 transition-transform hover:scale-105 flex items-center space-x-2">
                    <span>Buka Website SGIN &rarr;</span>
                </a>
            </div>
        </div>
    </body>
    </html>
    <?php
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1-Click Deployer - PT. Sugiyama Indonesia</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4 flex items-center justify-center">

    <div class="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-center">
        
        <div class="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto shadow-inner">
            ⚡
        </div>

        <div class="space-y-2">
            <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/30">Official SGIN Deployer</span>
            <h1 class="text-2xl sm:text-3xl font-black text-white">1-Click Website Deployer</h1>
            <p class="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
                Sinkronkan seluruh kode & assets dari repositori resmi <strong>PT. Sugiyama Indonesia</strong> (<code>Frhstaaa/sgin-company</code>) langsung ke server hosting Anda.
            </p>
        </div>

        <div class="p-4 rounded-2xl bg-black/60 border border-slate-800 text-left text-xs space-y-2 font-mono text-slate-300">
            <div class="flex justify-between">
                <span class="text-slate-500">Repository:</span>
                <span class="text-emerald-400 font-bold">Frhstaaa/sgin-company</span>
            </div>
            <div class="flex justify-between">
                <span class="text-slate-500">Branch:</span>
                <span class="text-blue-400 font-bold">main</span>
            </div>
            <div class="flex justify-between">
                <span class="text-slate-500">Base Path:</span>
                <span class="text-slate-400 truncate max-w-[200px]" title="<?php echo htmlspecialchars($basePath); ?>"><?php echo htmlspecialchars($basePath); ?></span>
            </div>
            <div class="flex justify-between">
                <span class="text-slate-500">PHP CLI:</span>
                <span class="text-amber-400 truncate max-w-[200px]"><?php echo htmlspecialchars($phpCli); ?></span>
            </div>
        </div>

        <form method="POST">
            <input type="hidden" name="run" value="1">
            <button type="submit" onclick="this.innerHTML='⏳ Sedang Menjalankan Deploy... Mohon Tunggu...'; this.style.opacity='0.7';" class="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2">
                <span>🚀 Jalankan Deploy Sekarang</span>
            </button>
        </form>

        <p class="text-[11px] text-slate-500">
            Setelah deploy berhasil, Anda dapat langsung membuka <a href="./" class="text-emerald-400 hover:underline">Halaman Utama Website</a>.
        </p>

    </div>

</body>
</html>
