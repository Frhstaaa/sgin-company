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
            // Beranda Hero & Cards
            'home_hero_video',
            'home_facility_badge', 'home_facility_tag_jp', 'home_facility_title', 'home_facility_desc',
            'home_facility_feat1_title', 'home_facility_feat1_desc',
            'home_facility_feat2_title', 'home_facility_feat2_desc',
            'home_facility_btn_text', 'home_facility_btn_link',
            'home_process_badge', 'home_process_tag_jp', 'home_process_title', 'home_process_desc',
            'home_process_step1', 'home_process_step2', 'home_process_step3',
            'home_process_btn_text', 'home_process_btn_link',

            // Tentang Kami
            'about_hero_badge', 'about_hero_title', 'about_hero_lead', 'about_hero_video',
            // Teknologi
            'tech_hero_badge', 'tech_hero_title', 'tech_hero_lead', 'tech_hero_video',
            // Bisnis
            'biz_hero_badge', 'biz_hero_title', 'biz_hero_lead', 'biz_hero_video',
            // Peralatan
            'machine_hero_badge', 'machine_hero_title', 'machine_hero_lead', 'machine_hero_video',
            // Proses Produksi
            'prod_hero_badge', 'prod_hero_title', 'prod_hero_lead', 'prod_hero_video',
            // Produk
            'product_hero_badge', 'product_hero_title', 'product_hero_lead', 'product_hero_video',
            // Berita
            'news_hero_badge', 'news_hero_title', 'news_hero_lead', 'news_hero_video',
            // Karir
            'career_hero_badge', 'career_hero_title', 'career_hero_lead', 'career_hero_video',
            // Kontak
            'contact_hero_badge', 'contact_hero_title', 'contact_hero_lead', 'contact_hero_video',
        ];

        foreach ($bannerKeys as $key) {
            if ($request->has($key)) {
                $this->settingService->set($key, $request->input($key), 'banners');
            }
        }

        if ($request->hasFile('home_facility_image')) {
            $path = $request->file('home_facility_image')->store('banners', 'public');
            $this->settingService->set('home_facility_image', '/storage/' . $path, 'banners');
        }

        if ($request->hasFile('home_process_image')) {
            $path = $request->file('home_process_image')->store('banners', 'public');
            $this->settingService->set('home_process_image', '/storage/' . $path, 'banners');
        }

        return back()->with('success', 'Seluruh Banner Halaman & Konten Beranda berhasil diperbarui.');
    }
}
