<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\InquiryService;
use App\Services\SettingService;
use App\Services\ProductService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function __construct(
        protected InquiryService $inquiryService,
        protected SettingService $settingService,
        protected ProductService $productService
    ) {}

    public function index(Request $request): Response
    {
        $productId = $request->query('product_id');
        $selectedProduct = null;
        if ($productId) {
            try {
                $selectedProduct = $this->productService->findById((int)$productId);
            } catch (\Exception $e) {}
        }

        $allProducts = $this->productService->getAll([], 100);

        return Inertia::render('Contact/Index', [
            'selectedProduct' => $selectedProduct,
            'products' => $allProducts->items(),
            'defaultType' => $request->query('type', 'general'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'type' => 'required|string|in:general,rfq,career,consultation',
            'name' => 'required|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
            'product_id' => 'nullable|exists:products,id',
        ]);

        $this->inquiryService->create($validated);

        return back()->with('success', 'Terima kasih, pesan atau permintaan penawaran Anda telah berhasil terkirim. Tim teknis PT. Sugiyama Indonesia akan segera menghubungi Anda.');
    }
}
