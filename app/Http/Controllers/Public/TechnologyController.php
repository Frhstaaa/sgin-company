<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\TechnologyService;
use Inertia\Inertia;
use Inertia\Response;

class TechnologyController extends Controller
{
    public function __construct(
        protected TechnologyService $technologyService
    ) {}

    public function index(): Response
    {
        $technologies = $this->technologyService->getAll();
        return Inertia::render('Technology/Index', [
            'technologies' => $technologies,
        ]);
    }

    public function show(string $slug): Response
    {
        $technology = $this->technologyService->findBySlug($slug);
        $allTechnologies = $this->technologyService->getAll();
        return Inertia::render('Technology/Show', [
            'technology' => $technology,
            'allTechnologies' => $allTechnologies,
        ]);
    }
}
