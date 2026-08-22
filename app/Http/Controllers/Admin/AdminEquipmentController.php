<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Services\EquipmentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminEquipmentController extends Controller
{
    public function __construct(
        protected EquipmentService $equipmentService
    ) {}

    public function index(): Response
    {
        $equipments = $this->equipmentService->getAll();
        $categories = $this->equipmentService->getCategories();

        return Inertia::render('Admin/Equipment/Index', [
            'equipments' => $equipments,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category' => 'required|string|max:100',
            'name' => 'required|string|max:255',
            'model_number' => 'nullable|string|max:100',
            'manufacturer' => 'nullable|string|max:150',
            'specs' => 'nullable|array',
            'quantity' => 'integer|min:1',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'description' => 'nullable|string',
            'order' => 'integer',
        ]);

        $imageFile = $request->file('image');
        unset($validated['image']);

        $this->equipmentService->create($validated, $imageFile);
        return back()->with('success', 'Mesin / Peralatan berhasil ditambahkan.');
    }

    public function update(Request $request, Equipment $equipment): RedirectResponse
    {
        $validated = $request->validate([
            'category' => 'required|string|max:100',
            'name' => 'required|string|max:255',
            'model_number' => 'nullable|string|max:100',
            'manufacturer' => 'nullable|string|max:150',
            'specs' => 'nullable|array',
            'quantity' => 'integer|min:1',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'description' => 'nullable|string',
            'order' => 'integer',
        ]);

        $imageFile = $request->file('image');
        unset($validated['image']);

        $this->equipmentService->update($equipment->id, $validated, $imageFile);
        return back()->with('success', 'Mesin / Peralatan berhasil diperbarui.');
    }

    public function destroy(Equipment $equipment): RedirectResponse
    {
        $this->equipmentService->delete($equipment->id);
        return back()->with('success', 'Mesin / Peralatan berhasil dihapus.');
    }
}
