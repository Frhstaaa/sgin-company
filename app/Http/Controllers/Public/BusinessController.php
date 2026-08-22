<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\BusinessService;
use Inertia\Inertia;
use Inertia\Response;

class BusinessController extends Controller
{
    public function __construct(
        protected BusinessService $businessService
    ) {}

    public function index(): Response
    {
        $businesses = $this->businessService->getAll();
        return Inertia::render('Business/Index', [
            'businesses' => $businesses,
        ]);
    }

    public function show(string $slug): Response
    {
        $business = $this->businessService->findBySlug($slug);
        $allBusinesses = $this->businessService->getAll();
        return Inertia::render('Business/Show', [
            'business' => $business,
            'allBusinesses' => $allBusinesses,
        ]);
    }
}
