<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminProductController extends Controller
{
    public function __construct(
        protected ProductService $productService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['category', 'search']);
        $products = $this->productService->getAll($filters, 20);
        $categories = $this->productService->getAllCategories();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $filters,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:product_categories,id',
            'sku' => 'nullable|string|max:100',
            'name' => 'required|string|max:255',
            'name_jp' => 'nullable|string|max:255',
            'material' => 'nullable|string|max:255',
            'application' => 'nullable|string|max:255',
            'tolerance' => 'nullable|string|max:100',
            'specs' => 'nullable|array',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        $imageFile = $request->file('image');
        unset($validated['image']);

        $this->productService->create($validated, $imageFile);
        return back()->with('success', 'Produk berhasil ditambahkan.');
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:product_categories,id',
            'sku' => 'nullable|string|max:100',
            'name' => 'required|string|max:255',
            'name_jp' => 'nullable|string|max:255',
            'material' => 'nullable|string|max:255',
            'application' => 'nullable|string|max:255',
            'tolerance' => 'nullable|string|max:100',
            'specs' => 'nullable|array',
            'image' => 'nullable|image|max:5120',
            'image_url' => 'nullable|string',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ]);

        $imageFile = $request->file('image');
        unset($validated['image']);

        $this->productService->update($product->id, $validated, $imageFile);
        return back()->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->productService->delete($product->id);
        return back()->with('success', 'Produk berhasil dihapus.');
    }
}
