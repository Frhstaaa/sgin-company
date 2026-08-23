<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductionProcess;
use App\Services\FileUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminProductionProcessController extends Controller
{
    public function __construct(
        protected FileUploadService $fileUploadService
    ) {}

    public function index(): Response
    {
        $processes = ProductionProcess::ordered()->get();

        return Inertia::render('Admin/ProductionProcesses/Index', [
            'processes' => $processes,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'step_number' => 'required|string|max:20',
            'category' => 'required|string|max:50',
            'title_id' => 'required|string|max:255',
            'title_jp' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'description_id' => 'required|string',
            'description_jp' => 'nullable|string',
            'description_en' => 'nullable|string',
            'location_badge' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:50',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string|max:500',
            'specs' => 'nullable|array',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_url'] = $this->fileUploadService->uploadImage($request->file('image'), 'processes');
        }
        unset($validated['image']);

        ProductionProcess::create($validated);

        return back()->with('success', 'Tahapan proses produksi berhasil ditambahkan.');
    }

    public function update(Request $request, ProductionProcess $production_process): RedirectResponse
    {
        $validated = $request->validate([
            'step_number' => 'required|string|max:20',
            'category' => 'required|string|max:50',
            'title_id' => 'required|string|max:255',
            'title_jp' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'description_id' => 'required|string',
            'description_jp' => 'nullable|string',
            'description_en' => 'nullable|string',
            'location_badge' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:50',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string|max:500',
            'specs' => 'nullable|array',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $this->fileUploadService->deleteImage($production_process->image_url);
            $validated['image_url'] = $this->fileUploadService->uploadImage($request->file('image'), 'processes');
        }
        unset($validated['image']);

        $production_process->update($validated);

        return back()->with('success', 'Tahapan proses produksi berhasil diperbarui.');
    }

    public function destroy(ProductionProcess $production_process): RedirectResponse
    {
        $this->fileUploadService->deleteImage($production_process->image_url);
        $production_process->delete();

        return back()->with('success', 'Tahapan proses produksi berhasil dihapus.');
    }
}
