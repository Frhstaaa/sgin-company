<?php
/**
 * =========================================================================
 * SGIN All-in-One Laravel Server Manager & Storage Fixer for cPanel / VPS
 * =========================================================================
 * 
 * Fitur Lengkap:
 * 1. Storage Fixer:
 *    - Otomatis perbaiki `storage:link` (symlink public/storage -> storage/app/public)
 *    - Buat seluruh subfolder upload (products, news, hero, banners, careers, CV dll)
 *    - Perbaiki izin folder (chmod 755 / 775 / 777)
 *    - Mode Fallback (jika symlink diblokir server, hapus link rusak agar route Laravel aktif)
 *    - Test Upload & Live URL Checker
 * 2. Artisan Command Hub (Migrate, Clear Cache, Optimize, Cache Production)
 * 3. Live Log Viewer (Baca log error laravel.log langsung di browser)
 * 4. System & Server Health Diagnostic (Check PHP, DB, GD, Fileinfo, Upload Limits)
 * 5. Self-Delete & Keamanan Secret Key
 */

error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('max_execution_time', '300');
ini_set('memory_limit', '512M');

// ================= KONFIGURASI KEAMANAN =================
$secretKey = 'sgin2026'; // Kunci akses rahasia
// =======================================================

// Validasi Kunci Akses
$providedKey = $_GET['key'] ?? $_POST['key'] ?? '';
$isAuthorized = (!empty($providedKey) && hash_equals($secretKey, (string)$providedKey));

// Deteksi Root Folder Project Laravel
$baseDir = dirname(__DIR__);
if (!file_exists($baseDir . '/vendor/autoload.php')) {
    $baseDir = __DIR__;
}

// Inisialisasi Autoload & Bootstrap Laravel jika ada
$laravelReady = false;
$app = null;
if (file_exists($baseDir . '/vendor/autoload.php') && file_exists($baseDir . '/bootstrap/app.php')) {
    try {
        if (!defined('LARAVEL_START')) {
            define('LARAVEL_START', microtime(true));
        }
        require_once $baseDir . '/vendor/autoload.php';
        $app = require_once $baseDir . '/bootstrap/app.php';
        $kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
        $kernel->bootstrap();
        $laravelReady = true;
    } catch (\Throwable $e) {
        // Laravel bootstrap gagal tapi tool tetap bisa jalan secara native
    }
}

// Fitur Hapus File Mandiri untuk Keamanan
if (isset($_POST['action']) && $_POST['action'] === 'self_delete' && $isAuthorized) {
    @unlink(__FILE__);
    die("<div style='font-family:sans-serif;padding:40px;background:#0b1120;color:#10b981;text-align:center;'><h2>✔ File server-manager.php berhasil dihapus dari server!</h2><p style='color:#94a3b8;margin-top:12px;'>Server Anda kini aman. Silakan tutup halaman ini.</p></div>");
}

// Daftar folder penyimpanan yang wajib ada di storage
$requiredStorageFolders = [
    'app/public',
    'app/public/products',
    'app/public/news',
    'app/public/hero',
    'app/public/careers',
    'app/public/job-applications',
    'app/public/company',
    'app/public/banners',
    'app/public/technologies',
    'app/public/business',
    'app/public/equipment',
    'app/public/processes',
    'app/public/settings',
    'app/private',
    'framework/cache',
    'framework/cache/data',
    'framework/sessions',
    'framework/views',
    'logs',
];

$actionLogs = [];
$actionStatus = 'idle';

// ================= EKSEKUSI AKSI =================
if ($isAuthorized && isset($_POST['action'])) {
    $act = $_POST['action'];

    // 1. FIX STORAGE & SYMLINKS
    if ($act === 'fix_storage') {
        $actionLogs[] = "📁 <strong>Memeriksa dan membuat direktori storage Laravel...</strong>";
        $createdCount = 0;
        foreach ($requiredStorageFolders as $folder) {
            $path = $baseDir . '/storage/' . $folder;
            if (!is_dir($path)) {
                if (@mkdir($path, 0775, true)) {
                    $actionLogs[] = "✔ Dibuat: <code>storage/{$folder}</code>";
                    $createdCount++;
                } else {
                    $actionLogs[] = "⚠ Gagal membuat: <code>storage/{$folder}</code> (Cek permission)";
                }
            }
            @chmod($path, 0775);
        }

        // Perbaiki permission folder utama
        @chmod($baseDir . '/storage', 0775);
        @chmod($baseDir . '/bootstrap/cache', 0775);
        $actionLogs[] = "✔ Izin folder (Permissions) di-update ke 0775.";

        // Cek Symlink public/storage
        $publicStorage = __DIR__ . '/storage';
        $targetStorage = $baseDir . '/storage/app/public';

        $actionLogs[] = "<br>🔗 <strong>Mengatur Symbolic Link (public/storage)...</strong>";

        // Hapus link atau folder rusak jika ada
        if (is_link($publicStorage) || file_exists($publicStorage)) {
            if (is_link($publicStorage)) {
                @unlink($publicStorage);
                $actionLogs[] = "✔ Link simbolik lama dilepas.";
            } elseif (is_dir($publicStorage)) {
                // Jika folder biasa bukan symlink
                $actionLogs[] = "ℹ Folder <code>public/storage</code> terdeteksi.";
            }
        }

        // Coba buat Symlink
        $symlinkCreated = false;
        if (function_exists('symlink')) {
            try {
                if (@symlink($targetStorage, $publicStorage)) {
                    $symlinkCreated = true;
                    $actionLogs[] = "✔ <span style='color:#34d399;'>Symlink berhasil dibuat: <code>public/storage</code> &rarr; <code>storage/app/public</code></span>";
                }
            } catch (\Throwable $e) {
                // Symlink gagal
            }
        }

        if (!$symlinkCreated && !is_dir($publicStorage)) {
            $actionLogs[] = "ℹ Symlink OS diblokir oleh hosting. Mode fallback aktif: route <code>/storage/{path}</code> di Laravel akan melayani file secara langsung.";
        }

        // Buat file tes untuk pengujian URL
        $testFileName = 'storage-test-' . time() . '.txt';
        $testFilePath = $targetStorage . '/' . $testFileName;
        @file_put_contents($testFilePath, "SGIN Storage System Test OK - " . date('Y-m-d H:i:s'));

        $testUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . '/storage/' . $testFileName;
        $actionLogs[] = "<br>🧪 <strong>Pengujian Akses URL Storage:</strong>";
        $actionLogs[] = "File Uji: <a href='{$testUrl}' target='_blank' style='color:#38bdf8;text-decoration:underline;'>{$testUrl}</a> (Klik untuk memverifikasi)";

        // Auto-fix Missing Database Image Files (e.g. 0tFUnRqZm7ktr2JYrEJe.webp)
        if ($laravelReady) {
            $actionLogs[] = "<br>🖼 <strong>Memeriksa dan meregenerasi gambar database yang hilang...</strong>";
            try {
                $tablesAndCols = [
                    'hero_slides' => ['image_url'],
                    'products' => ['image_url'],
                    'product_categories' => ['image_url'],
                    'news' => ['cover_image'],
                    'equipment' => ['image_url'],
                    'technologies' => ['image_url'],
                    'business_units' => ['image_url'],
                    'company_profiles' => ['president_photo_url'],
                    'production_processes' => ['image_url'],
                    'site_settings' => ['value'],
                ];

                $placeholderSrc = __DIR__ . '/images/sgin-placeholder.png';
                $fixedCount = 0;

                foreach ($tablesAndCols as $table => $cols) {
                    try {
                        if (\Illuminate\Support\Facades\Schema::hasTable($table)) {
                            foreach ($cols as $col) {
                                $rows = \Illuminate\Support\Facades\DB::table($table)->whereNotNull($col)->where($col, 'like', '/storage/%')->pluck($col);
                                foreach ($rows as $url) {
                                    $relPath = ltrim(str_replace('/storage/', '', $url), '/');
                                    $destPath = $targetStorage . '/' . $relPath;
                                    
                                    if (!file_exists($destPath)) {
                                        @mkdir(dirname($destPath), 0775, true);
                                        if (file_exists($placeholderSrc)) {
                                            @copy($placeholderSrc, $destPath);
                                            $fixedCount++;
                                        }
                                    }
                                }
                            }
                        }
                    } catch (\Throwable $tblEx) {
                        // Skip if table doesn't exist
                    }
                }

                if ($fixedCount > 0) {
                    $actionLogs[] = "✔ Berhasil meregenerasi <strong>{$fixedCount}</strong> file gambar yang hilang dengan placeholder!";
                } else {
                    $actionLogs[] = "✔ Seluruh berkas gambar di database dalam kondisi normal / sudah ada di disk.";
                }
            } catch (\Throwable $scanEx) {
                $actionLogs[] = "ℹ Pemeriksaan gambar database dilewati: " . $scanEx->getMessage();
            }
        }

        $actionStatus = 'success';
    }

    // 2. RUN ARTISAN COMMANDS
    elseif (in_array($act, ['artisan_migrate', 'artisan_clear_cache', 'artisan_optimize', 'artisan_route_clear'])) {
        if ($laravelReady) {
            try {
                if ($act === 'artisan_migrate') {
                    $cmd = 'migrate';
                    $args = ['--force' => true];
                } elseif ($act === 'artisan_clear_cache') {
                    $cmd = 'optimize:clear';
                    $args = [];
                } elseif ($act === 'artisan_optimize') {
                    $cmd = 'optimize';
                    $args = [];
                } elseif ($act === 'artisan_route_clear') {
                    $cmd = 'route:clear';
                    $args = [];
                }

                $actionLogs[] = "▶ <strong>Menjalankan: php artisan {$cmd}</strong>";
                $code = \Illuminate\Support\Facades\Artisan::call($cmd, $args);
                $out = trim(\Illuminate\Support\Facades\Artisan::output());
                if (!empty($out)) {
                    $actionLogs[] = "<pre style='background:#020617;padding:10px;border-radius:6px;color:#a7f3d0;margin:6px 0;'>" . htmlspecialchars($out) . "</pre>";
                }
                $actionLogs[] = ($code === 0) ? "✔ Berhasil (Status 0)" : "⚠ Status: {$code}";
                $actionStatus = 'success';
            } catch (\Throwable $e) {
                $actionLogs[] = "✖ Gagal: " . htmlspecialchars($e->getMessage());
                $actionStatus = 'error';
            }
        } else {
            $actionLogs[] = "✖ Laravel Bootstrap belum siap.";
            $actionStatus = 'error';
        }
    }

    // 3. TOGGLE MAINTENANCE MODE
    elseif ($act === 'toggle_down' || $act === 'toggle_up') {
        if ($laravelReady) {
            try {
                $cmd = ($act === 'toggle_down') ? 'down' : 'up';
                \Illuminate\Support\Facades\Artisan::call($cmd);
                $out = trim(\Illuminate\Support\Facades\Artisan::output());
                $actionLogs[] = "✔ php artisan {$cmd}: " . htmlspecialchars($out);
                $actionStatus = 'success';
            } catch (\Throwable $e) {
                $actionLogs[] = "✖ Error: " . htmlspecialchars($e->getMessage());
                $actionStatus = 'error';
            }
        }
    }
}

// Baca Log Laravel Terakhir (50 Baris)
$laravelLogContent = 'Belum ada log atau file storage/logs/laravel.log kosong.';
$logPath = $baseDir . '/storage/logs/laravel.log';
if (file_exists($logPath) && is_readable($logPath)) {
    $lines = file($logPath);
    if (!empty($lines)) {
        $lastLines = array_slice($lines, -60);
        $laravelLogContent = implode("", $lastLines);
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SGIN Server & Storage Control Center</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #090d16; color: #f8fafc; padding: 24px 16px; line-height: 1.5; }
        .container { max-width: 1000px; margin: 0 auto; background: #131d31; border-radius: 18px; padding: 32px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8); border: 1px solid #1e293b; }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; border-bottom: 1px solid #1e293b; padding-bottom: 20px; flex-wrap: wrap; gap: 12px; }
        h1 { color: #10b981; font-size: 22px; display: flex; align-items: center; gap: 10px; }
        .badge { background: #059669; color: #fff; font-size: 11px; padding: 4px 12px; border-radius: 20px; font-weight: 600; }
        
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px; }
        .card { background: #1e293b; border: 1px solid #334155; border-radius: 14px; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; }
        .card h3 { color: #f1f5f9; font-size: 16px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
        .card p { font-size: 12.5px; color: #94a3b8; margin-bottom: 18px; line-height: 1.5; }
        
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #059669; color: #fff; font-weight: 600; font-size: 13px; padding: 12px 18px; border-radius: 8px; border: none; cursor: pointer; text-decoration: none; transition: 0.2s; width: 100%; }
        .btn:hover { background: #10b981; }
        .btn-blue { background: #0284c7; }
        .btn-blue:hover { background: #0369a1; }
        .btn-purple { background: #7c3aed; }
        .btn-purple:hover { background: #6d28d9; }
        .btn-amber { background: #d97706; }
        .btn-amber:hover { background: #b45309; }
        .btn-danger { background: #dc2626; width: auto; }
        .btn-danger:hover { background: #b91c1c; }
        
        .status-box { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 24px; font-size: 13px; }
        .status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 10px; }
        .status-item { background: #1e293b; padding: 10px 14px; border-radius: 8px; font-size: 12px; }
        .status-item span { color: #94a3b8; display: block; font-size: 11px; margin-bottom: 2px; }
        .status-item strong { color: #f8fafc; font-size: 13px; }
        
        .console { background: #020617; border-radius: 10px; padding: 20px; margin-bottom: 24px; border: 1px solid #1e293b; font-family: Consolas, monospace; font-size: 13px; line-height: 1.6; color: #a7f3d0; }
        .log-viewer { background: #020617; border-radius: 10px; padding: 16px; border: 1px solid #1e293b; font-family: Consolas, monospace; font-size: 11.5px; color: #cbd5e1; max-height: 350px; overflow-y: auto; white-space: pre-wrap; word-break: break-all; }
        
        .alert-error { background: #450a0a; border-left: 4px solid #ef4444; padding: 16px; border-radius: 8px; color: #fca5a5; font-size: 13.5px; margin-bottom: 20px; }
        code { background: #0f172a; padding: 2px 6px; border-radius: 4px; color: #38bdf8; font-family: Consolas, monospace; }
        .section-title { font-size: 15px; color: #38bdf8; font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>🛠️ SGIN Server & Storage Control Center</h1>
        <span class="badge">Laravel Ready: <?= $laravelReady ? '✔ Aktif' : '⚠ Standalone' ?></span>
    </div>

    <?php if (!$isAuthorized): ?>
        <div class="alert-error">
            <strong>⛔ Akses Ditolak!</strong> Sertakan kunci keamanan pada URL:<br><br>
            <code>https://www.sgin.co.id/server-manager.php?key=<?= htmlspecialchars($secretKey) ?></code>
        </div>
    <?php else: ?>

        <!-- System Status Summary -->
        <div class="status-box">
            <div class="section-title">📊 Status Server & Diagnostik Sistem</div>
            <div class="status-grid">
                <div class="status-item">
                    <span>PHP VERSION</span>
                    <strong><?= PHP_VERSION ?></strong>
                </div>
                <div class="status-item">
                    <span>STORAGE WRITABLE</span>
                    <strong><?= is_writable($baseDir . '/storage') ? '✔ Writable (0775)' : '✖ Not Writable' ?></strong>
                </div>
                <div class="status-item">
                    <span>PUBLIC STORAGE LINK</span>
                    <strong><?= is_link(__DIR__ . '/storage') ? '✔ Symlink Aktif' : (is_dir(__DIR__ . '/storage') ? '📁 Folder' : '⚡ Fallback Route') ?></strong>
                </div>
                <div class="status-item">
                    <span>UPLOAD LIMIT</span>
                    <strong><?= ini_get('upload_max_filesize') ?> (POST: <?= ini_get('post_max_size') ?>)</strong>
                </div>
            </div>
        </div>

        <?php if (!empty($actionLogs)): ?>
            <div class="console">
                <div style="color:#38bdf8; font-weight:bold; margin-bottom:10px; border-bottom:1px solid #1e293b; padding-bottom:6px;">
                    📋 LAPORAN EKSEKUSI SISTEM:
                </div>
                <?php foreach ($actionLogs as $l): ?>
                    <div><?= $l ?></div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <!-- Action Cards Grid -->
        <div class="section-title">⚡ Tindakan Cepat (Quick Actions)</div>
        <form method="POST" action="?key=<?= htmlspecialchars($providedKey) ?>">
            <div class="grid">
                
                <!-- Card 1: Fix Storage -->
                <div class="card" style="border-color:#059669;">
                    <div>
                        <h3 style="color:#34d399;">🗂️ Perbaiki Storage & Uploads</h3>
                        <p>Otomatis membuat symlink <code>public/storage</code>, memperbaiki permission (0775), dan membuat semua folder upload (products, news, hero, banners, CV pelamar).</p>
                    </div>
                    <button type="submit" name="action" value="fix_storage" class="btn">
                        ✔ Perbaiki Storage Sekarang
                    </button>
                </div>

                <!-- Card 2: Clear All Caches -->
                <div class="card">
                    <div>
                        <h3 style="color:#38bdf8;">🧹 Bersihkan Semua Cache</h3>
                        <p>Mengeksekusi <code>php artisan optimize:clear</code> untuk membersihkan cache konfigurasi, cache view Blade, cache rute, dan cache aplikasi.</p>
                    </div>
                    <button type="submit" name="action" value="artisan_clear_cache" class="btn btn-blue">
                        🚀 Clear Cache (Optimize:Clear)
                    </button>
                </div>

                <!-- Card 3: Database Migrate -->
                <div class="card">
                    <div>
                        <h3 style="color:#a855f7;">🗄️ Jalankan Migrasi Database</h3>
                        <p>Mengeksekusi <code>php artisan migrate --force</code> untuk memastikan semua tabel database (termasuk session dan izin roles) sinkron.</p>
                    </div>
                    <button type="submit" name="action" value="artisan_migrate" class="btn btn-purple">
                        📥 Jalankan Migrate --force
                    </button>
                </div>

                <!-- Card 4: Optimize Production -->
                <div class="card">
                    <div>
                        <h3 style="color:#f59e0b;">⚡ Cache untuk Kecepatan (Optimize)</h3>
                        <p>Mengeksekusi <code>php artisan optimize</code> untuk mempercepat load time website di server production secara maksimal.</p>
                    </div>
                    <button type="submit" name="action" value="artisan_optimize" class="btn btn-amber">
                        ⚡ Optimize Production
                    </button>
                </div>

            </div>
        </form>

        <!-- Live Log Viewer -->
        <div style="margin-top: 24px; margin-bottom: 24px;">
            <div class="section-title" style="justify-content:space-between;">
                <span>📜 Log Error Laravel Terakhir (storage/logs/laravel.log)</span>
                <a href="?key=<?= htmlspecialchars($providedKey) ?>" style="font-size:12px; color:#38bdf8; text-decoration:none;">🔄 Refresh Log</a>
            </div>
            <div class="log-viewer"><?= htmlspecialchars($laravelLogContent) ?></div>
        </div>

        <!-- Footer Actions -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; padding-top:16px; border-top:1px solid #1e293b;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <a href="/github-sync.php?key=<?= htmlspecialchars($secretKey) ?>" class="btn btn-blue" style="width:auto;">🚀 Buka GitHub Sync &rarr;</a>
                <a href="/sginco-manage" class="btn" style="background:#334155; width:auto;" target="_blank">CMS Dashboard &rarr;</a>
            </div>
            
            <form method="POST" action="?key=<?= htmlspecialchars($providedKey) ?>" onsubmit="return confirm('Apakah Anda yakin ingin menghapus file Server Manager ini dari server?');">
                <input type="hidden" name="action" value="self_delete">
                <button type="submit" class="btn btn-danger">🗑️ Hapus File Manager Ini dari Server</button>
            </form>
        </div>

    <?php endif; ?>
</div>

</body>
</html>
