<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\Public\StoreJobApplicationRequest;
use App\Models\Career;
use App\Models\JobApplication;
use App\Services\CaptchaService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CareerApplicationController extends Controller
{
    public function create(Request $request)
    {
        $careers = Career::active()->get(['id', 'slug', 'title', 'department', 'location']);
        
        $selectedCareer = null;
        if ($request->has('position')) {
            $selectedCareer = Career::where('slug', $request->query('position'))->first();
        }

        $captcha = CaptchaService::generate('career_captcha');

        return Inertia::render('Career/Apply', [
            'careers' => $careers,
            'selectedCareer' => $selectedCareer,
            'preselectedPosition' => $request->query('position'),
            'captchaSvg' => $captcha['svg'],
        ]);
    }

    public function createForCareer(string $slug)
    {
        $selectedCareer = Career::where('slug', $slug)->firstOrFail();
        $careers = Career::active()->get(['id', 'slug', 'title', 'department', 'location']);
        $captcha = CaptchaService::generate('career_captcha');

        return Inertia::render('Career/Apply', [
            'careers' => $careers,
            'selectedCareer' => $selectedCareer,
            'preselectedPosition' => $slug,
            'captchaSvg' => $captcha['svg'],
        ]);
    }

    public function refreshCaptcha()
    {
        $captcha = CaptchaService::generate('career_captcha');
        return response()->json([
            'captcha_svg' => $captcha['svg'],
        ]);
    }

    public function store(StoreJobApplicationRequest $request)
    {
        $validated = $request->validated();

        // Handle CV upload with secure randomized naming and sanitized extension
        if ($request->hasFile('cv_file')) {
            $file = $request->file('cv_file');
            $safeName = Str::slug($validated['full_name']) . '-' . time() . '-' . Str::random(8) . '.' . ($file->extension() ?: 'pdf');
            $path = $file->storeAs('resumes', $safeName, 'public');
            $validated['cv_path'] = $path;
        }

        // Auto-fill position title from career model if career_id is present
        if (!empty($validated['career_id'])) {
            $career = Career::find($validated['career_id']);
            if ($career) {
                $validated['position_title'] = $career->title;
            }
        }

        unset($validated['cv_file'], $validated['captcha_code'], $validated['honeypot_trap']);

        JobApplication::create($validated);

        return redirect()->back()->with('success', 'Lamaran Anda berhasil dikirim! Tim HRD PT. Sugiyama Indonesia akan meninjau CV Anda dan menghubungi melalui email atau WhatsApp.');
    }
}
