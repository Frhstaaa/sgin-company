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
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\SitemapController;

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
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/teknologi', [TechnologyController::class, 'index'])->name('technology.index');
Route::get('/teknologi/{slug}', [TechnologyController::class, 'show'])->name('technology.show');

Route::get('/bisnis', [BusinessController::class, 'index'])->name('business.index');
Route::get('/bisnis/{slug}', [BusinessController::class, 'show'])->name('business.show');

Route::get('/peralatan', [EquipmentController::class, 'index'])->name('equipment.index');

Route::get('/proses-produksi', [ProductionProcessController::class, 'index'])->name('production-process.index');

Route::get('/produk', [ProductController::class, 'index'])->name('product.index');
Route::get('/produk/{slug}', [ProductController::class, 'show'])->name('product.show');

Route::get('/tentang-kami', [AboutController::class, 'index'])->name('about.index');

Route::get('/berita', [NewsController::class, 'index'])->name('news.index');
Route::get('/berita/{slug}', [NewsController::class, 'show'])->name('news.show');

Route::get('/karir', [CareerController::class, 'index'])->name('career.index');
Route::get('/karir/{slug}', [CareerController::class, 'show'])->name('career.show');

Route::get('/kontak', [ContactController::class, 'index'])->name('contact.index');
Route::post('/kontak', [ContactController::class, 'store'])->name('contact.store');

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
| Admin Authentication Routes
|--------------------------------------------------------------------------
*/
// Fallback login route for standard auth middleware
Route::get('/login', fn () => redirect()->route('admin.login'))->name('login');

Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('admin.login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('admin.login.post');
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
