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
            'philosophy' => 'nullable|string',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'history_timeline' => 'nullable|array',
            'certifications' => 'nullable|array',
            'branches' => 'nullable|array',
            'capital' => 'nullable|string|max:100',
            'established_date' => 'nullable|string|max:100',
            'employees_count' => 'nullable|string|max:100',
            'about_hero_badge' => 'nullable|string|max:255',
            'about_hero_title' => 'nullable|string|max:255',
            'about_hero_lead' => 'nullable|string',
            'home_about_image' => 'nullable|image|max:5120',
            'home_about_badge_quality' => 'nullable|string|max:255',
            'home_about_badge_heritage' => 'nullable|string|max:255',
            'home_about_plant_title' => 'nullable|string|max:255',
            'home_about_plant_subtitle' => 'nullable|string|max:255',
            'home_about_plant_tag' => 'nullable|string|max:100',
        ]);

        // Save Header Banner Settings
        if ($request->has('about_hero_badge')) {
            $this->settingService->set('about_hero_badge', $request->input('about_hero_badge'), 'header');
        }
        if ($request->has('about_hero_title')) {
            $this->settingService->set('about_hero_title', $request->input('about_hero_title'), 'header');
        }
        if ($request->has('about_hero_lead')) {
            $this->settingService->set('about_hero_lead', $request->input('about_hero_lead'), 'header');
        }

        // Save Home About Showcase Settings
        if ($request->has('home_about_badge_quality')) {
            $this->settingService->set('home_about_badge_quality', $request->input('home_about_badge_quality'), 'about');
        }
        if ($request->has('home_about_badge_heritage')) {
            $this->settingService->set('home_about_badge_heritage', $request->input('home_about_badge_heritage'), 'about');
        }
        if ($request->has('home_about_plant_title')) {
            $this->settingService->set('home_about_plant_title', $request->input('home_about_plant_title'), 'about');
        }
        if ($request->has('home_about_plant_subtitle')) {
            $this->settingService->set('home_about_plant_subtitle', $request->input('home_about_plant_subtitle'), 'about');
        }
        if ($request->has('home_about_plant_tag')) {
            $this->settingService->set('home_about_plant_tag', $request->input('home_about_plant_tag'), 'about');
        }
        if ($request->hasFile('home_about_image')) {
            $path = $request->file('home_about_image')->store('company', 'public');
            $this->settingService->set('home_about_image', '/storage/' . $path, 'about');
        }

        $presidentPhoto = $request->file('president_photo');
        unset(
            $validated['president_photo'], 
            $validated['about_hero_badge'], 
            $validated['about_hero_title'], 
            $validated['about_hero_lead'],
            $validated['home_about_image'],
            $validated['home_about_badge_quality'],
            $validated['home_about_badge_heritage'],
            $validated['home_about_plant_title'],
            $validated['home_about_plant_subtitle'],
            $validated['home_about_plant_tag']
        );

        $this->profileService->updateProfile($validated, $presidentPhoto);
        return back()->with('success', 'Profil perusahaan & pengaturan tampilan Tentang Kami berhasil diperbarui.');
    }
}

