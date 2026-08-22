<?php

namespace App\Services;

use App\Repositories\Contracts\HeroRepositoryInterface;
use App\Repositories\Contracts\StatRepositoryInterface;
use App\Repositories\Contracts\TechnologyRepositoryInterface;
use App\Repositories\Contracts\BusinessRepositoryInterface;
use App\Repositories\Contracts\EquipmentRepositoryInterface;
use App\Repositories\Contracts\ProductRepositoryInterface;
use App\Repositories\Contracts\CompanyProfileRepositoryInterface;
use App\Repositories\Contracts\NewsRepositoryInterface;
use App\Repositories\Contracts\SettingRepositoryInterface;

class HomeService
{
    public function __construct(
        protected HeroRepositoryInterface $heroRepo,
        protected StatRepositoryInterface $statRepo,
        protected TechnologyRepositoryInterface $technologyRepo,
        protected BusinessRepositoryInterface $businessRepo,
        protected EquipmentRepositoryInterface $equipmentRepo,
        protected ProductRepositoryInterface $productRepo,
        protected CompanyProfileRepositoryInterface $companyProfileRepo,
        protected NewsRepositoryInterface $newsRepo,
        protected SettingRepositoryInterface $settingRepo
    ) {}

    public function getHomePageData(): array
    {
        return [
            'heroSlides' => $this->heroRepo->getActive(),
            'stats' => $this->statRepo->getAll(),
            'technologies' => $this->technologyRepo->getAll(),
            'businesses' => $this->businessRepo->getAll(),
            'featuredProducts' => $this->productRepo->getFeatured(4),
            'equipmentCount' => $this->equipmentRepo->getAll()->count(),
            'about' => $this->companyProfileRepo->getProfile(),
            'latestNews' => $this->newsRepo->getLatest(4),
            'settings' => $this->settingRepo->getAll(),
        ];
    }
}
