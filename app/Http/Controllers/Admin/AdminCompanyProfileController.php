<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\CompanyProfileService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminCompanyProfileController extends Controller
{
    public function __construct(
        protected CompanyProfileService $profileService
    ) {}

    public function edit(): Response
    {
        $profile = $this->profileService->getProfile();
        return Inertia::render('Admin/CompanyProfile/Edit', [
            'profile' => $profile,
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
        ]);

        $presidentPhoto = $request->file('president_photo');
        unset($validated['president_photo']);

        $this->profileService->updateProfile($validated, $presidentPhoto);
        return back()->with('success', 'Profil perusahaan berhasil diperbarui.');
    }
}
