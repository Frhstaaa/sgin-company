<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Services\SettingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminPageBannerController extends Controller
{
    public function __construct(
        protected SettingService $settingService
    ) {}

    public function index(): Response
    {
        $settings = SiteSetting::all()->pluck('value', 'key')->toArray();

        return Inertia::render('Admin/Banners/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $bannerKeys = [
            // Tentang Kami
            'about_hero_badge', 'about_hero_title', 'about_hero_lead',
            // Teknologi
            'tech_hero_badge', 'tech_hero_title', 'tech_hero_lead',
            // Bisnis
            'biz_hero_badge', 'biz_hero_title', 'biz_hero_lead',
            // Peralatan
            'machine_hero_badge', 'machine_hero_title', 'machine_hero_lead',
            // Produk
            'product_hero_badge', 'product_hero_title', 'product_hero_lead',
            // Berita
            'news_hero_badge', 'news_hero_title', 'news_hero_lead',
            // Karir
            'career_hero_badge', 'career_hero_title', 'career_hero_lead',
            // Kontak
            'contact_hero_badge', 'contact_hero_title', 'contact_hero_lead',
        ];

        foreach ($bannerKeys as $key) {
            if ($request->has($key)) {
                $this->settingService->set($key, $request->input($key), 'banners');
            }
        }

        return back()->with('success', 'Seluruh Banner Header Halaman berhasil diperbarui.');
    }
}
