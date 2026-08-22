<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        protected ProductService $productService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['category', 'search', 'featured']);
        $products = $this->productService->getAll($filters, 12);
        $categories = $this->productService->getAllCategories();

        return Inertia::render('Product/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $filters,
        ]);
    }

    public function show(string $slug): Response
    {
        $product = $this->productService->findBySlug($slug);
        $relatedProducts = $this->productService->getFeatured(4);

        return Inertia::render('Product/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
