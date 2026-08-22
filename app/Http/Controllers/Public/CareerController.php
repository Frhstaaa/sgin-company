<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\CareerService;
use Inertia\Inertia;
use Inertia\Response;

class CareerController extends Controller
{
    public function __construct(
        protected CareerService $careerService
    ) {}

    public function index(): Response
    {
        $careers = $this->careerService->getAll(true);
        return Inertia::render('Career/Index', [
            'careers' => $careers,
        ]);
    }

    public function show(string $slug): Response
    {
        $career = $this->careerService->findBySlug($slug);
        return Inertia::render('Career/Show', [
            'career' => $career,
        ]);
    }
}
