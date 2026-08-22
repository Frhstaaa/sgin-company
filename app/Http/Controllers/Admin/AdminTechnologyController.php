<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Technology;
use App\Services\TechnologyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminTechnologyController extends Controller
{
    public function __construct(
        protected TechnologyService $technologyService
    ) {}

    public function index(): Response
    {
        $technologies = $this->technologyService->getAll();
        return Inertia::render('Admin/Technologies/Index', [
            'technologies' => $technologies,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'step_number' => 'required|string|max:10',
            'title' => 'required|string|max:255',
            'title_jp' => 'nullable|string|max:255',
            'short_description' => 'required|string',
            'content' => 'nullable|string',
            'features' => 'nullable|array',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
            'order' => 'integer',
        ]);

        $imageFile = $request->file('image');
        unset($validated['image']);

        $this->technologyService->create($validated, $imageFile);
        return back()->with('success', 'Teknologi berhasil ditambahkan.');
    }

    public function update(Request $request, Technology $technology): RedirectResponse
    {
        $validated = $request->validate([
            'step_number' => 'required|string|max:10',
            'title' => 'required|string|max:255',
            'title_jp' => 'nullable|string|max:255',
            'short_description' => 'required|string',
            'content' => 'nullable|string',
            'features' => 'nullable|array',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
            'order' => 'integer',
        ]);

        $imageFile = $request->file('image');
        unset($validated['image']);

        $this->technologyService->update($technology->id, $validated, $imageFile);
        return back()->with('success', 'Teknologi berhasil diperbarui.');
    }

    public function destroy(Technology $technology): RedirectResponse
    {
        $this->technologyService->delete($technology->id);
        return back()->with('success', 'Teknologi berhasil dihapus.');
    }
}
