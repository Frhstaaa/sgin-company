<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Services\CompanyProfileService;
use App\Services\SettingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminCompanyProfileController extends Controller
{
    public function __construct(
        protected CompanyProfileService $profileService,
        protected SettingService $settingService
    ) {}

    public function edit(): Response
    {
        $profile = $this->profileService->getProfile();
        $settings = SiteSetting::all()->pluck('value', 'key')->toArray();

        return Inertia::render('Admin/CompanyProfile/Edit', [
            'profile' => $profile,
            'settings' => $settings,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_name_jp' => 'nullable|string|max:255',
            'president_name' => 'nullable|string|max:255',
            'president_message' => 'nullable|string',
            'president_photo' => 'nullable|image|max:5120',
            'president_photo_url' => 'nullable|string',
            'philosophy' => 'nullable',
            'vision' => 'nullable',
            'mission' => 'nullable',
            'vision_list' => 'nullable|array',
            'mission_list' => 'nullable|array',
            'philosophy_list' => 'nullable|array',
            'history_timeline' => 'nullable|array',
            'certifications' => 'nullable|array',
            'branches' => 'nullable|array',
            'capital' => 'nullable|string|max:100',
            'established_date' => 'nullable|string|max:100',
            'employees_count' => 'nullable|string|max:100',

            // Hero Header & Quick Stats
            'about_hero_badge' => 'nullable|string|max:255',
            'about_hero_title' => 'nullable|string|max:255',
            'about_hero_lead' => 'nullable|string',
            'about_hero_video' => 'nullable|string|max:500',
            'about_stat1_label' => 'nullable|string|max:100',
            'about_stat1_value' => 'nullable|string|max:100',
            'about_stat2_label' => 'nullable|string|max:100',
            'about_stat2_value' => 'nullable|string|max:100',
            'about_stat3_label' => 'nullable|string|max:100',
            'about_stat3_value' => 'nullable|string|max:100',
            'about_stat4_label' => 'nullable|string|max:100',
            'about_stat4_value' => 'nullable|string|max:100',

            // President & Leadership Section
            'about_president_badge' => 'nullable|string|max:255',
            'about_president_title' => 'nullable|string|max:255',
            'about_president_role' => 'nullable|string|max:255',
            'about_president_tag' => 'nullable|string|max:255',
            'home_about_image' => 'nullable|image|max:5120',
            'home_about_badge_quality' => 'nullable|string|max:255',
            'home_about_badge_heritage' => 'nullable|string|max:255',
            'home_about_plant_title' => 'nullable|string|max:255',
            'home_about_plant_subtitle' => 'nullable|string|max:255',
            'home_about_plant_tag' => 'nullable|string|max:100',

            // 3 Pillar Section
            'about_pillar_badge' => 'nullable|string|max:255',
            'about_pillar_title' => 'nullable|string|max:255',
            'about_pillar_subtitle' => 'nullable|string',

            // Factsheet Section Additional Fields
            'factsheet_certifications' => 'nullable|string|max:255',
            'factsheet_business_scope' => 'nullable|string|max:255',
            'factsheet_shareholders' => 'nullable|string|max:255',
            'factsheet_site_area' => 'nullable|string|max:100',
            'factsheet_building_area' => 'nullable|string|max:100',
            'factsheet_customers' => 'nullable|string|max:500',
            'factsheet_customers_domestic' => 'nullable|string|max:500',
            'factsheet_customers_overseas' => 'nullable|string|max:500',
            'factsheet_customers_domestic_list' => 'nullable|array',
            'factsheet_customers_overseas_list' => 'nullable|array',

            // CTA Banner Section
            'about_cta_badge' => 'nullable|string|max:255',
            'about_cta_title' => 'nullable|string|max:255',
            'about_cta_lead' => 'nullable|string',
            'about_cta_btn1_text' => 'nullable|string|max:100',
            'about_cta_btn1_link' => 'nullable|string|max:255',
            'about_cta_btn2_text' => 'nullable|string|max:100',
            'about_cta_btn2_link' => 'nullable|string|max:255',
        ]);

        // Setting keys to save into SiteSettings table
        $settingKeys = [
            'about_hero_badge', 'about_hero_title', 'about_hero_lead', 'about_hero_video',
            'about_stat1_label', 'about_stat1_value',
            'about_stat2_label', 'about_stat2_value',
            'about_stat3_label', 'about_stat3_value',
            'about_stat4_label', 'about_stat4_value',
            'about_president_badge', 'about_president_title', 'about_president_role', 'about_president_tag',
            'home_about_badge_quality', 'home_about_badge_heritage',
            'home_about_plant_title', 'home_about_plant_subtitle', 'home_about_plant_tag',
            'about_pillar_badge', 'about_pillar_title', 'about_pillar_subtitle',
            'factsheet_certifications', 'factsheet_business_scope',
            'factsheet_shareholders', 'factsheet_site_area', 'factsheet_building_area', 'factsheet_customers',
            'factsheet_customers_domestic', 'factsheet_customers_overseas',
            'about_cta_badge', 'about_cta_title', 'about_cta_lead',
            'about_cta_btn1_text', 'about_cta_btn1_link',
            'about_cta_btn2_text', 'about_cta_btn2_link',
        ];

        foreach ($settingKeys as $key) {
            if ($request->has($key)) {
                $this->settingService->set($key, $request->input($key), 'about');
            }
        }

        if ($request->has('factsheet_customers_domestic_list')) {
            $domArr = array_values(array_filter((array)$request->input('factsheet_customers_domestic_list'), fn($v) => trim((string)$v) !== ''));
            $domVal = implode(', ', $domArr);
            $this->settingService->set('factsheet_customers_domestic', $domVal, 'about');
            $this->settingService->set('factsheet_customers_domestic_list', json_encode($domArr, JSON_UNESCAPED_UNICODE), 'about');
        }

        if ($request->has('factsheet_customers_overseas_list')) {
            $ovsArr = array_values(array_filter((array)$request->input('factsheet_customers_overseas_list'), fn($v) => trim((string)$v) !== ''));
            $ovsVal = implode(', ', $ovsArr);
            $this->settingService->set('factsheet_customers_overseas', $ovsVal, 'about');
            $this->settingService->set('factsheet_customers_overseas_list', json_encode($ovsArr, JSON_UNESCAPED_UNICODE), 'about');
        }

        if ($request->hasFile('home_about_image')) {
            $path = $request->file('home_about_image')->store('company', 'public');
            $this->settingService->set('home_about_image', '/storage/' . $path, 'about');
        }

        $presidentPhoto = $request->file('president_photo');
        
        if ($request->has('vision_list')) {
            $visionArr = array_values(array_filter((array)$request->input('vision_list'), fn($v) => trim((string)$v) !== ''));
            $validated['vision'] = count($visionArr) > 0 ? json_encode($visionArr, JSON_UNESCAPED_UNICODE) : null;
        } elseif (is_array($validated['vision'] ?? null)) {
            $validated['vision'] = json_encode(array_values(array_filter($validated['vision'])), JSON_UNESCAPED_UNICODE);
        }

        if ($request->has('mission_list')) {
            $missionArr = array_values(array_filter((array)$request->input('mission_list'), fn($m) => trim((string)$m) !== ''));
            $validated['mission'] = count($missionArr) > 0 ? json_encode($missionArr, JSON_UNESCAPED_UNICODE) : null;
        } elseif (is_array($validated['mission'] ?? null)) {
            $validated['mission'] = json_encode(array_values(array_filter($validated['mission'])), JSON_UNESCAPED_UNICODE);
        }

        if ($request->has('philosophy_list')) {
            $philArr = array_values(array_filter((array)$request->input('philosophy_list'), fn($p) => trim((string)$p) !== ''));
            $validated['philosophy'] = count($philArr) > 0 ? json_encode($philArr, JSON_UNESCAPED_UNICODE) : null;
        } elseif (is_array($validated['philosophy'] ?? null)) {
            $validated['philosophy'] = json_encode(array_values(array_filter($validated['philosophy'])), JSON_UNESCAPED_UNICODE);
        }

        unset($validated['vision_list'], $validated['mission_list'], $validated['philosophy_list']);

        // Remove site setting keys from validated array before updating company_profiles model
        foreach ($settingKeys as $key) {
            unset($validated[$key]);
        }
        unset($validated['president_photo'], $validated['home_about_image']);

        $this->profileService->updateProfile($validated, $presidentPhoto);
        return back()->with('success', 'Seluruh konten halaman Tentang Kami & Profil Perusahaan berhasil diperbarui.');
    }
}

