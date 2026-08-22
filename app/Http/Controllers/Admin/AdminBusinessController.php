<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BusinessUnit;
use App\Services\BusinessService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminBusinessController extends Controller
{
    public function __construct(
        protected BusinessService $businessService
    ) {}

    public function index(): Response
    {
        $businesses = $this->businessService->getAll();
        return Inertia::render('Admin/BusinessUnits/Index', [
            'businesses' => $businesses,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_jp' => 'nullable|string|max:255',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'tag' => 'nullable|string|max:100',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'order' => 'integer',
        ]);

        $imageFile = $request->file('image');
        unset($validated['image']);

        $this->businessService->create($validated, $imageFile);
        return back()->with('success', 'Unit bisnis berhasil ditambahkan.');
    }

    public function update(Request $request, BusinessUnit $businessUnit): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_jp' => 'nullable|string|max:255',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'tag' => 'nullable|string|max:100',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'order' => 'integer',
        ]);

        $imageFile = $request->file('image');
        unset($validated['image']);

        $this->businessService->update($businessUnit->id, $validated, $imageFile);
        return back()->with('success', 'Unit bisnis berhasil diperbarui.');
    }

    public function destroy(BusinessUnit $businessUnit): RedirectResponse
    {
        $this->businessService->delete($businessUnit->id);
        return back()->with('success', 'Unit bisnis berhasil dihapus.');
    }
}
