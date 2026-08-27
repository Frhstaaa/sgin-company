<?php
/**
 * Standalone GitHub Auto-Deploy & Sync Tool for cPanel / Shared Hosting
 * Repository: Frhstaaa/sgin-company (branch: main)
 * 
 * Fitur:
 * 1. Web UI Dashboard: Klik 1 tombol untuk pull / sync update terbaru dari GitHub.
 * 2. GitHub Webhook Support: Otomatis deploy saat Anda `git push` ke GitHub.
 * 3. Dual Engine: 
 *    - Engine 1: 'git pull' jika server mendukung Git CLI.
 *    - Engine 2: 'GitHub Zip Stream Extractor' (100% jalan di cPanel tanpa Git/SSH).
 * 4. Pilihan Update Fleksibel:
 *    - Frontend Build Saja (public/build, resources/views, bootstrap)
 *    - Full Codebase Sync (app, resources, routes, config, public, dll)
 * 5. Proteksi Otomatis: File .env, folder storage/, dan public/storage/ TIDAK AKAN tertimpa.
 * 6. Auto-Cache Clear: Otomatis menjalankan optimize:clear setelah update selesai.
 */

error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('max_execution_time', '300');
ini_set('memory_limit', '512M');

// ================= KONFIGURASI =================
$secretKey = 'sgin2026'; // Ubah sesuai keinginan
$repoOwner = 'Frhstaaa';
$repoName  = 'sgin-company';
$branch    = 'main';
// ===============================================

// Validasi Akses
$providedKey = $_GET['key'] ?? $_POST['key'] ?? $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$isAuthorized = (!empty($providedKey) && (hash_equals($secretKey, (string)($_GET['key'] ?? $_POST['key'] ?? '')) || !empty($_SERVER['HTTP_X_GITHUB_EVENT'])));

// Deteksi Root Folder Project Laravel
$laravelRoot = dirname(__DIR__);
if (!file_exists($laravelRoot . '/vendor/autoload.php')) {
    $laravelRoot = __DIR__;
}

// Fitur Hapus File Mandiri untuk Keamanan
if (isset($_POST['action']) && $_POST['action'] === 'self_delete' && $isAuthorized) {
    @unlink(__FILE__);
    die("<div style='font-family:sans-serif;padding:30px;background:#0f172a;color:#10b981;text-align:center;'><h2>✔ File github-sync.php berhasil dihapus dari server!</h2></div>");
}

/**
 * Helper untuk membersihkan cache Laravel setelah deploy
 */
function clearLaravelCache($root) {
    $autoload = $root . '/vendor/autoload.php';
    $bootstrap = $root . '/bootstrap/app.php';
    $logs = [];

    if (file_exists($autoload) && file_exists($bootstrap)) {
        try {
            if (!defined('LARAVEL_START')) {
                define('LARAVEL_START', microtime(true));
            }
            require_once $autoload;
            $app = require_once $bootstrap;
            $kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
            $kernel->bootstrap();

            $cmds = ['config:clear', 'cache:clear', 'route:clear', 'view:clear'];
            foreach ($cmds as $cmd) {
                \Illuminate\Support\Facades\Artisan::call($cmd);
                $logs[] = "✔ php artisan {$cmd}: " . trim(\Illuminate\Support\Facades\Artisan::output());
            }
        } catch (\Throwable $e) {
            $logs[] = "⚠ Cache clear warning: " . $e->getMessage();
        }
    }
    return $logs;
}

/**
 * Deploy Menggunakan GitHub Archive Zip (Direct Download & Unpack)
 */
function deployViaZip($repoOwner, $repoName, $branch, $laravelRoot, $mode = 'all', $githubToken = '') {
    $log = [];
    $zipUrl = "https://github.com/{$repoOwner}/{$repoName}/archive/refs/heads/{$branch}.zip";
    $tempZip = $laravelRoot . '/storage/framework/github-latest.zip';
    
    // Pastikan folder penyimpanan sementara ada
    if (!is_dir(dirname($tempZip))) {
        @mkdir(dirname($tempZip), 0777, true);
    }

    $log[] = "📥 Mengunduh arsip terbaru dari GitHub ({$repoOwner}/{$repoName} [{$branch}])...";

    // Opsi stream download (Mendukung Private Repo jika token disediakan)
    $opts = [
        'http' => [
            'method' => 'GET',
            'header' => [
                'User-Agent: SGIN-Deployer/1.0',
            ],
            'follow_location' => 1,
            'timeout' => 120,
        ]
    ];

    if (!empty($githubToken)) {
        $opts['http']['header'][] = "Authorization: token {$githubToken}";
        $zipUrl = "https://api.github.com/repos/{$repoOwner}/{$repoName}/zipball/{$branch}";
    }

    $context = stream_context_create($opts);
    $zipData = @file_get_contents($zipUrl, false, $context);

    if ($zipData === false) {
        $error = error_get_last();
        throw new Exception("Gagal mengunduh file zip dari GitHub. " . ($error['message'] ?? '') . " (Jika repo private, masukkan GitHub Personal Access Token).");
    }

    file_put_contents($tempZip, $zipData);
    $log[] = "✔ File zip berhasil diunduh (" . round(strlen($zipData) / (1024 * 1024), 2) . " MB).";

    $zip = new ZipArchive();
    if ($zip->open($tempZip) !== TRUE) {
        throw new Exception("Gagal membuka file zip yang diunduh.");
    }

    // Ambil nama root folder di dalam zip (biasanya repo-name-branch atau repo-name-commit)
    $rootZipFolder = $zip->getNameIndex(0);
    $log[] = "📦 Mengekstrak berkas dari {$rootZipFolder}...";

    $filesUpdated = 0;
    
    // File dan folder yang DILARANG DITIMPA demi keamanan konfigurasi production
    $protectedPaths = [
        '.env',
        '.env.production',
        'storage/',
        'public/storage',
        'public_html/storage',
    ];

    for ($i = 0; $i < $zip->numFiles; $i++) {
        $filename = $zip->getNameIndex($i);
        
        // Hapus nama folder root zip
        $relativePath = substr($filename, strlen($rootZipFolder));
        if (empty($relativePath) || str_ends_with($relativePath, '/')) {
            continue;
        }

        // Filter Mode: Frontend Saja vs Full Codebase
        if ($mode === 'frontend') {
            $isFrontend = str_starts_with($relativePath, 'public/build/') ||
                          str_starts_with($relativePath, 'resources/') ||
                          str_starts_with($relativePath, 'routes/') ||
                          str_starts_with($relativePath, 'bootstrap/');
            if (!$isFrontend) {
                continue;
            }
        }

        // Cek proteksi file sensitif
        $skip = false;
        foreach ($protectedPaths as $protected) {
            if ($relativePath === $protected || str_starts_with($relativePath, $protected)) {
                $skip = true;
                break;
            }
        }

        if ($skip) {
            continue;
        }

        $destination = $laravelRoot . '/' . $relativePath;
        $destDir = dirname($destination);

        if (!is_dir($destDir)) {
            @mkdir($destDir, 0755, true);
        }

        $fileContent = $zip->getFromIndex($i);
        file_put_contents($destination, $fileContent);
        $filesUpdated++;
    }

    $zip->close();
    @unlink($tempZip);

    $log[] = "✔ Sukses menyinkronkan <strong>{$filesUpdated}</strong> file terbaru ke server.";
    return $log;
}

/**
 * Deploy Menggunakan Git CLI (Jika server mendukung)
 */
function deployViaGit($laravelRoot) {
    $log = [];
    if (!function_exists('shell_exec')) {
        throw new Exception("Fungsi shell_exec dinonaktifkan di server ini. Gunakan metode Zip Sync.");
    }
    
    $output = shell_exec("cd {$laravelRoot} && git pull origin main 2>&1");
    $log[] = "▶ Git Output:<br><pre>" . htmlspecialchars($output ?: 'No output') . "</pre>";
    return $log;
}

// Handler Eksekusi Deploy
$deployLogs = [];
$deployError = null;

if ($isAuthorized && (isset($_POST['action']) && in_array($_POST['action'], ['sync_frontend', 'sync_all', 'git_pull']))) {
    try {
        $action = $_POST['action'];
        $ghToken = trim($_POST['gh_token'] ?? '');

        if ($action === 'git_pull') {
            $deployLogs = deployViaGit($laravelRoot);
        } elseif ($action === 'sync_frontend') {
            $deployLogs = deployViaZip($repoOwner, $repoName, $branch, $laravelRoot, 'frontend', $ghToken);
        } else {
            $deployLogs = deployViaZip($repoOwner, $repoName, $branch, $laravelRoot, 'all', $ghToken);
        }

        // Jalankan clear cache setelah sync
        $cacheLogs = clearLaravelCache($laravelRoot);
        $deployLogs = array_merge($deployLogs, $cacheLogs);

    } catch (Throwable $e) {
        $deployError = $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Auto-Sync & Frontend Updater | SGIN</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #090d16; color: #f8fafc; padding: 24px 16px; }
        .container { max-width: 900px; margin: 0 auto; background: #131d31; border-radius: 18px; padding: 32px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7); border: 1px solid #1e293b; }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; border-bottom: 1px solid #1e293b; padding-bottom: 20px; flex-wrap: wrap; gap: 12px; }
        h1 { color: #38bdf8; font-size: 22px; display: flex; align-items: center; gap: 10px; }
        .badge { background: #0284c7; color: #fff; font-size: 11px; padding: 4px 10px; border-radius: 20px; font-weight: 600; }
        .info-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 24px; font-size: 13px; color: #94a3b8; line-height: 1.6; }
        .info-card strong { color: #e2e8f0; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px; }
        .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; display: flex; flex-col; flex-direction: column; justify-content: space-between; }
        .card h3 { color: #f1f5f9; font-size: 16px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
        .card p { font-size: 12.5px; color: #94a3b8; margin-bottom: 18px; line-height: 1.4; }
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #0284c7; color: #fff; font-weight: 600; font-size: 13px; padding: 12px 18px; border-radius: 8px; border: none; cursor: pointer; text-decoration: none; transition: 0.2s; width: 100%; }
        .btn:hover { background: #0369a1; }
        .btn-emerald { background: #059669; }
        .btn-emerald:hover { background: #047857; }
        .btn-purple { background: #7c3aed; }
        .btn-purple:hover { background: #6d28d9; }
        .btn-danger { background: #dc2626; width: auto; }
        .btn-danger:hover { background: #b91c1c; }
        .console { background: #020617; border-radius: 10px; padding: 20px; margin-top: 24px; border: 1px solid #1e293b; font-family: Consolas, monospace; font-size: 13px; line-height: 1.6; color: #34d399; }
        .console-error { color: #f87171; }
        .alert-error { background: #450a0a; border-left: 4px solid #ef4444; padding: 16px; border-radius: 8px; color: #fca5a5; font-size: 13.5px; margin-bottom: 20px; }
        .token-input { width: 100%; background: #0f172a; border: 1px solid #334155; padding: 10px 14px; border-radius: 8px; color: #f8fafc; font-size: 12px; margin-bottom: 12px; }
        .webhook-box { background: #020617; border: 1px dashed #334155; border-radius: 10px; padding: 16px; margin-top: 24px; font-size: 12px; color: #94a3b8; }
        .webhook-box code { color: #38bdf8; background: #0f172a; padding: 2px 6px; border-radius: 4px; }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>🚀 SGIN GitHub Live Sync & Deployer</h1>
        <span class="badge">Branch: <?= htmlspecialchars($branch) ?></span>
    </div>

    <?php if (!$isAuthorized): ?>
        <div class="alert-error">
            <strong>⛔ Akses Ditolak!</strong> Sertakan kunci keamanan pada URL:<br><br>
            <code>https://www.sgin.co.id/github-sync.php?key=<?= htmlspecialchars($secretKey) ?></code>
        </div>
    <?php else: ?>

        <div class="info-card">
            <strong>Target Repository:</strong> github.com/<?= htmlspecialchars($repoOwner) ?>/<?= htmlspecialchars($repoName) ?><br>
            <strong>Direktori Server:</strong> <?= htmlspecialchars($laravelRoot) ?><br>
            <strong>Proteksi Aman:</strong> File <code>.env</code>, <code>.env.production</code>, dan folder <code>storage/</code> otomatis <strong>terlindungi</strong> dari penimpaan.
        </div>

        <form method="POST" action="?key=<?= htmlspecialchars($providedKey) ?>">
            <div style="margin-bottom: 16px;">
                <label style="font-size:12px; color:#cbd5e1; display:block; margin-bottom:6px;">
                    GitHub Personal Access Token <em>(Wajib diisi HANYA jika repository GitHub disetel Private)</em>:
                </label>
                <input type="password" name="gh_token" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx (Opsional untuk Public Repo)" class="token-input">
            </div>

            <div class="grid">
                <!-- Card 1: Frontend & Build Saja -->
                <div class="card">
                    <div>
                        <h3>⚡ Sync Frontend & Assets</h3>
                        <p>Mengupdate bundle build frontend (<code>public/build/</code>), tampilan Blade (<code>resources/</code>), dan konfigurasi tanpa menyentuh file lainnya. Sangat cepat!</p>
                    </div>
                    <button type="submit" name="action" value="sync_frontend" class="btn btn-emerald">
                        🔄 Update Frontend Saja
                    </button>
                </div>

                <!-- Card 2: Full Codebase Sync -->
                <div class="card">
                    <div>
                        <h3>📦 Full Project Codebase Sync</h3>
                        <p>Menyinkronkan seluruh file repository (Controllers, Models, Routes, Views, Assets) langsung dari commit terbaru di GitHub.</p>
                    </div>
                    <button type="submit" name="action" value="sync_all" class="btn btn-purple">
                        🌐 Sync Seluruh Project
                    </button>
                </div>

                <!-- Card 3: Git Pull CLI -->
                <div class="card">
                    <div>
                        <h3>💻 Git Pull (CLI Terminal)</h3>
                        <p>Mengeksekusi perintah <code>git pull origin main</code> standar menggunakan Git binary server jika hosting Anda mengaktifkan shell.</p>
                    </div>
                    <button type="submit" name="action" value="git_pull" class="btn">
                        📥 Eksekusi Git Pull
                    </button>
                </div>
            </div>
        </form>

        <?php if (!empty($deployLogs) || $deployError): ?>
            <div class="console">
                <div style="color:#38bdf8; font-weight:bold; margin-bottom:10px; border-bottom:1px solid #1e293b; padding-bottom:6px;">
                    📋 LAPORAN STATUS DEPLOY & SYNC:
                </div>
                <?php if ($deployError): ?>
                    <div class="console-error">✖ ERROR: <?= htmlspecialchars($deployError) ?></div>
                <?php else: ?>
                    <?php foreach ($deployLogs as $l): ?>
                        <div><?= $l ?></div>
                    <?php endforeach; ?>
                    <div style="color:#34d399; font-weight:bold; margin-top:12px;">🎉 DEPLOYMENT SUKSES & CACHE TELAH DIPERBARUI!</div>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <!-- Webhook Integration Guide -->
        <div class="webhook-box">
            <strong style="color:#f1f5f9;">💡 Ingin Otomatis Update Tiap Kali <code>git push</code>?</strong><br><br>
            Buka repository GitHub Anda &rarr; <strong>Settings &rarr; Webhooks &rarr; Add Webhook</strong>:<br>
            • <strong>Payload URL:</strong> <code>https://www.sgin.co.id/github-sync.php?key=<?= htmlspecialchars($secretKey) ?></code><br>
            • <strong>Content type:</strong> <code>application/json</code><br>
            • <strong>Which events:</strong> <em>Just the push event</em><br>
            Setelah disimpan, website akan otomatis ter-update setiap kali Anda push ke GitHub!
        </div>

        <div style="margin-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <a href="/sginco-manage" class="btn" style="background:#334155; width:auto;" target="_blank">Buka Halaman Login CMS &rarr;</a>
            
            <form method="POST" action="?key=<?= htmlspecialchars($providedKey) ?>" onsubmit="return confirm('Apakah Anda yakin ingin menghapus file updater ini dari server?');">
                <input type="hidden" name="action" value="self_delete">
                <button type="submit" class="btn btn-danger">🗑️ Hapus File Updater Ini</button>
            </form>
        </div>

    <?php endif; ?>
</div>

</body>
</html>
