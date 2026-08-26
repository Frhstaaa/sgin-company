<?php

use Illuminate\Support\Facades\Route;

// Public Controllers
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\TechnologyController;
use App\Http\Controllers\Public\BusinessController;
use App\Http\Controllers\Public\EquipmentController;
use App\Http\Controllers\Public\ProductController;
use App\Http\Controllers\Public\ProductionProcessController;
use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\NewsController;
use App\Http\Controllers\Public\CareerController;
use App\Http\Controllers\Public\CareerApplicationController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\SitemapController;
use App\Http\Controllers\LocaleController;

// Admin Controllers
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AdminHeroController;
use App\Http\Controllers\Admin\AdminStatController;
use App\Http\Controllers\Admin\AdminTechnologyController;
use App\Http\Controllers\Admin\AdminBusinessController;
use App\Http\Controllers\Admin\AdminEquipmentController;
use App\Http\Controllers\Admin\AdminProductionProcessController;
use App\Http\Controllers\Admin\AdminProductCategoryController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminCompanyProfileController;
use App\Http\Controllers\Admin\AdminNewsController;
use App\Http\Controllers\Admin\AdminCareerController;
use App\Http\Controllers\Admin\AdminJobApplicationController;
use App\Http\Controllers\Admin\AdminInquiryController;
use App\Http\Controllers\Admin\AdminSettingController;
use App\Http\Controllers\Admin\AdminPageBannerController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminProfileController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::match(['get', 'post'], '/locale/{locale}', [LocaleController::class, 'switch'])->name('locale.switch');

Route::get('/', [HomeController::class, 'index'])->name('home');

// Technology
Route::get('/technology', [TechnologyController::class, 'index'])->name('technology.index');
Route::get('/technology/{slug}', [TechnologyController::class, 'show'])->name('technology.show');

// Business
Route::get('/business', [BusinessController::class, 'index'])->name('business.index');
Route::get('/business/{slug}', [BusinessController::class, 'show'])->name('business.show');

// Equipment
Route::get('/equipment', [EquipmentController::class, 'index'])->name('equipment.index');

// Production Process
Route::get('/production-process', [ProductionProcessController::class, 'index'])->name('production-process.index');

// Products
Route::get('/products', [ProductController::class, 'index'])->name('product.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('product.show');

// About Us
Route::get('/about-us', [AboutController::class, 'index'])->name('about.index');

// News & Articles
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{slug}', [NewsController::class, 'show'])->name('news.show');

// Careers
Route::get('/careers', [CareerController::class, 'index'])->name('career.index');
Route::get('/careers/apply', [CareerApplicationController::class, 'create'])->name('career.apply');
Route::get('/careers/captcha/refresh', [CareerApplicationController::class, 'refreshCaptcha'])->name('career.captcha.refresh');
Route::get('/careers/{slug}/apply', [CareerApplicationController::class, 'createForCareer'])->name('career.apply.position');
Route::post('/careers/apply', [CareerApplicationController::class, 'store'])->name('career.apply.store');
Route::get('/careers/{slug}', [CareerController::class, 'show'])->name('career.show');

// Contact
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

/*
|--------------------------------------------------------------------------
| Legacy Indonesian & Alias URLs (301 Permanent Redirects to English URLs)
|--------------------------------------------------------------------------
*/
Route::redirect('/teknologi', '/technology', 301);
Route::get('/teknologi/{slug}', fn ($slug) => redirect("/technology/{$slug}", 301));

Route::redirect('/bisnis', '/business', 301);
Route::get('/bisnis/{slug}', fn ($slug) => redirect("/business/{$slug}", 301));

Route::redirect('/peralatan', '/equipment', 301);

Route::redirect('/proses-produksi', '/production-process', 301);

Route::redirect('/produk', '/products', 301);
Route::redirect('/product', '/products', 301);
Route::get('/produk/{slug}', fn ($slug) => redirect("/products/{$slug}", 301));
Route::get('/product/{slug}', fn ($slug) => redirect("/products/{$slug}", 301));

Route::redirect('/tentang-kami', '/about-us', 301);
Route::redirect('/about', '/about-us', 301);

Route::redirect('/berita', '/news', 301);
Route::get('/berita/{slug}', fn ($slug) => redirect("/news/{$slug}", 301));

Route::redirect('/karir', '/careers', 301);
Route::redirect('/career', '/careers', 301);
Route::redirect('/karir/lamar', '/careers/apply', 301);
Route::redirect('/career/apply', '/careers/apply', 301);
Route::get('/karir/{slug}', fn ($slug) => redirect("/careers/{$slug}", 301));
Route::get('/karir/{slug}/lamar', fn ($slug) => redirect("/careers/{$slug}/apply", 301));

Route::redirect('/kontak', '/contact', 301);
Route::post('/kontak', [ContactController::class, 'store']);
Route::post('/karir/lamar', [CareerApplicationController::class, 'store']);

// SEO Sitemap XML
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

// Public Storage File Delivery Fallback (For cPanel & Shared Hosting)
Route::get('/storage/{path}', function (string $path) {
    $filePath = storage_path('app/public/' . $path);
    if (!file_exists($filePath)) {
        abort(404);
    }
    $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
    $mimeType = match ($extension) {
        'webp' => 'image/webp',
        'png' => 'image/png',
        'jpg', 'jpeg' => 'image/jpeg',
        'svg' => 'image/svg+xml',
        'gif' => 'image/gif',
        'ico' => 'image/x-icon',
        'pdf' => 'application/pdf',
        default => @mime_content_type($filePath) ?: 'application/octet-stream'
    };
    return response()->file($filePath, [
        'Content-Type' => $mimeType,
        'Cache-Control' => 'public, max-age=604800, immutable',
    ]);
})->where('path', '.*')->name('storage.file');

/*
|--------------------------------------------------------------------------
| Admin Authentication Routes (Custom Private Route: /sginco-manage)
|--------------------------------------------------------------------------
*/
// Secure Private Access Route for CMS Admin (Can be overridden via ADMIN_SECRET_PATH in .env)
$adminSecretSlug = env('ADMIN_SECRET_PATH', 'sginco-manage');

Route::get("/{$adminSecretSlug}", [AdminAuthController::class, 'showLogin'])->name('admin.login');
Route::post("/{$adminSecretSlug}", [AdminAuthController::class, 'login'])->name('admin.login.post');
Route::post("/{$adminSecretSlug}/logout", [AdminAuthController::class, 'logout'])->name('sginco.logout');

// Block legacy and common bot probing paths with 404 Not Found
$blockedProbes = [
    'admin/login', 'login', 'wp-admin', 'wp-login.php', 'administrator',
    'backend', 'cpanel', 'user/login', 'auth/login', 'signin', 'admin.php',
];
foreach ($blockedProbes as $probe) {
    Route::any($probe, fn () => abort(404));
}

Route::prefix('admin')->group(function () {
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

    /*
    |--------------------------------------------------------------------------
    | Protected Admin Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware('auth')->name('admin.')->group(function () {
        Route::get('/', fn () => redirect()->route('admin.dashboard'));
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Hero Slides
        Route::resource('hero', AdminHeroController::class)->except(['create', 'show', 'edit']);

        // Stats
        Route::resource('stats', AdminStatController::class)->except(['create', 'show', 'edit']);

        // Technologies
        Route::resource('technologies', AdminTechnologyController::class)->except(['create', 'show', 'edit']);

        // Business Units
        Route::resource('business-units', AdminBusinessController::class)->except(['create', 'show', 'edit']);

        // Equipment
        Route::resource('equipment', AdminEquipmentController::class)->except(['create', 'show', 'edit']);

        // Production Processes
        Route::resource('production-processes', AdminProductionProcessController::class)->except(['create', 'show', 'edit']);

        // Product Categories
        Route::resource('product-categories', AdminProductCategoryController::class)->except(['create', 'show', 'edit']);

        // Products
        Route::resource('products', AdminProductController::class)->except(['create', 'show', 'edit']);

        // Company Profile
        Route::get('/company-profile', [AdminCompanyProfileController::class, 'edit'])->name('company-profile.edit');
        Route::match(['put', 'post'], '/company-profile', [AdminCompanyProfileController::class, 'update'])->name('company-profile.update');

        // News
        Route::resource('news', AdminNewsController::class)->except(['create', 'show', 'edit']);

        // Careers
        Route::resource('careers', AdminCareerController::class)->except(['create', 'show', 'edit']);

        // Job Applications (Pelamar Kerja & CV)
        Route::get('/job-applications', [AdminJobApplicationController::class, 'index'])->name('job-applications.index');
        Route::patch('/job-applications/{application}/status', [AdminJobApplicationController::class, 'updateStatus'])->name('job-applications.updateStatus');
        Route::delete('/job-applications/{application}', [AdminJobApplicationController::class, 'destroy'])->name('job-applications.destroy');

        // Inquiries / RFQs
        Route::get('/inquiries', [AdminInquiryController::class, 'index'])->name('inquiries.index');
        Route::get('/inquiries/{inquiry}', [AdminInquiryController::class, 'show'])->name('inquiries.show');
        Route::patch('/inquiries/{inquiry}/status', [AdminInquiryController::class, 'updateStatus'])->name('inquiries.updateStatus');
        Route::delete('/inquiries/{inquiry}', [AdminInquiryController::class, 'destroy'])->name('inquiries.destroy');

        // Site Settings
        Route::get('/settings', [AdminSettingController::class, 'index'])->name('settings.index');
        Route::post('/settings', [AdminSettingController::class, 'update'])->name('settings.update');

        // Page Banners Management
        Route::get('/page-banners', [AdminPageBannerController::class, 'index'])->name('page-banners.index');
        Route::post('/page-banners', [AdminPageBannerController::class, 'update'])->name('page-banners.update');

        // User Management (Spatie Roles)
        Route::resource('users', AdminUserController::class)->except(['create', 'show', 'edit']);

        // Profile & Change Password
        Route::get('/profile', [AdminProfileController::class, 'edit'])->name('profile.edit');
        Route::put('/profile', [AdminProfileController::class, 'updateProfile'])->name('profile.update');
        Route::put('/profile/password', [AdminProfileController::class, 'updatePassword'])->name('profile.password');
    });
});
