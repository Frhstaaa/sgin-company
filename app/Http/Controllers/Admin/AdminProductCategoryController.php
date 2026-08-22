<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use App\Services\ProductService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminProductCategoryController extends Controller
{
    public function __construct(
        protected ProductService $productService
    ) {}

    public function index(): Response
    {
        $categories = $this->productService->getAllCategories();
        return Inertia::render('Admin/ProductCategories/Index', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_jp' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'order' => 'integer',
        ]);

        $imageFile = $request->file('image');
        unset($validated['image']);

        $this->productService->createCategory($validated, $imageFile);
        return back()->with('success', 'Kategori produk berhasil ditambahkan.');
    }

    public function update(Request $request, ProductCategory $productCategory): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_jp' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'order' => 'integer',
        ]);

        $imageFile = $request->file('image');
        unset($validated['image']);

        $this->productService->updateCategory($productCategory->id, $validated, $imageFile);
        return back()->with('success', 'Kategori produk berhasil diperbarui.');
    }

    public function destroy(ProductCategory $productCategory): RedirectResponse
    {
        $this->productService->deleteCategory($productCategory->id);
        return back()->with('success', 'Kategori produk berhasil dihapus.');
    }
}
