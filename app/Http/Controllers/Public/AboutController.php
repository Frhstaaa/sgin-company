<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\CompanyProfileService;
use App\Services\EquipmentService;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function __construct(
        protected CompanyProfileService $companyProfileService,
        protected EquipmentService $equipmentService
    ) {}

    public function index(): Response
    {
        $profile = $this->companyProfileService->getProfile();
        $equipmentCount = $this->equipmentService->getAll()->count();

        return Inertia::render('About/Index', [
            'profile' => $profile,
            'equipmentCount' => $equipmentCount,
        ]);
    }
}
