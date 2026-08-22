<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\HomeService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        protected HomeService $homeService
    ) {}

    public function index(): Response
    {
        $data = $this->homeService->getHomePageData();
        return Inertia::render('Home', $data);
    }
}
