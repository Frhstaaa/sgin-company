<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use App\Services\FileUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminHeroController extends Controller
{
    public function __construct(
        protected FileUploadService $fileUploadService
    ) {}

    public function index(): Response
    {
        $slides = HeroSlide::orderBy('order', 'asc')->get();
        return Inertia::render('Admin/Hero/Index', [
            'slides' => $slides,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_jp' => 'nullable|string|max:255',
            'title_id' => 'required|string|max:255',
            'subtitle' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'button_text' => 'nullable|string|max:100',
            'button_link' => 'nullable|string|max:255',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_url'] = $this->fileUploadService->uploadImage($request->file('image'), 'hero');
        }

        unset($validated['image']);
        HeroSlide::create($validated);

        return back()->with('success', 'Slide hero berhasil ditambahkan.');
    }

    public function update(Request $request, HeroSlide $hero): RedirectResponse
    {
        $validated = $request->validate([
            'title_jp' => 'nullable|string|max:255',
            'title_id' => 'required|string|max:255',
            'subtitle' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'button_text' => 'nullable|string|max:100',
            'button_link' => 'nullable|string|max:255',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $this->fileUploadService->deleteImage($hero->image_url);
            $validated['image_url'] = $this->fileUploadService->uploadImage($request->file('image'), 'hero');
        }

        unset($validated['image']);
        $hero->update($validated);

        return back()->with('success', 'Slide hero berhasil diperbarui.');
    }

    public function destroy(HeroSlide $hero): RedirectResponse
    {
        $this->fileUploadService->deleteImage($hero->image_url);
        $hero->delete();
        return back()->with('success', 'Slide hero berhasil dihapus.');
    }
}
