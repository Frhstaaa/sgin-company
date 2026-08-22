<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Services\SettingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminSettingController extends Controller
{
    public function __construct(
        protected SettingService $settingService
    ) {}

    public function index(): Response
    {
        $settings = SiteSetting::all();
        $settingsMap = $settings->pluck('value', 'key')->toArray();

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settingsMap,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'logo' => 'nullable|image|max:5120',
            'favicon' => 'nullable|image|max:1024',
        ]);

        $settingsData = $request->except(['_token', 'logo', 'favicon']);
        $files = [
            'site_logo' => $request->file('logo'),
            'site_favicon' => $request->file('favicon'),
        ];

        $this->settingService->updateMultiple($settingsData, array_filter($files));

        return back()->with('success', 'Pengaturan situs berhasil disimpan.');
    }
}
