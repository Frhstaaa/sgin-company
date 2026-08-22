<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

// Repository Interfaces
use App\Repositories\Contracts\HeroRepositoryInterface;
use App\Repositories\Contracts\StatRepositoryInterface;
use App\Repositories\Contracts\TechnologyRepositoryInterface;
use App\Repositories\Contracts\BusinessRepositoryInterface;
use App\Repositories\Contracts\EquipmentRepositoryInterface;
use App\Repositories\Contracts\ProductRepositoryInterface;
use App\Repositories\Contracts\CompanyProfileRepositoryInterface;
use App\Repositories\Contracts\NewsRepositoryInterface;
use App\Repositories\Contracts\CareerRepositoryInterface;
use App\Repositories\Contracts\InquiryRepositoryInterface;
use App\Repositories\Contracts\SettingRepositoryInterface;

// Eloquent Implementations
use App\Repositories\Eloquent\EloquentHeroRepository;
use App\Repositories\Eloquent\EloquentStatRepository;
use App\Repositories\Eloquent\EloquentTechnologyRepository;
use App\Repositories\Eloquent\EloquentBusinessRepository;
use App\Repositories\Eloquent\EloquentEquipmentRepository;
use App\Repositories\Eloquent\EloquentProductRepository;
use App\Repositories\Eloquent\EloquentCompanyProfileRepository;
use App\Repositories\Eloquent\EloquentNewsRepository;
use App\Repositories\Eloquent\EloquentCareerRepository;
use App\Repositories\Eloquent\EloquentInquiryRepository;
use App\Repositories\Eloquent\EloquentSettingRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(HeroRepositoryInterface::class, EloquentHeroRepository::class);
        $this->app->bind(StatRepositoryInterface::class, EloquentStatRepository::class);
        $this->app->bind(TechnologyRepositoryInterface::class, EloquentTechnologyRepository::class);
        $this->app->bind(BusinessRepositoryInterface::class, EloquentBusinessRepository::class);
        $this->app->bind(EquipmentRepositoryInterface::class, EloquentEquipmentRepository::class);
        $this->app->bind(ProductRepositoryInterface::class, EloquentProductRepository::class);
        $this->app->bind(CompanyProfileRepositoryInterface::class, EloquentCompanyProfileRepository::class);
        $this->app->bind(NewsRepositoryInterface::class, EloquentNewsRepository::class);
        $this->app->bind(CareerRepositoryInterface::class, EloquentCareerRepository::class);
        $this->app->bind(InquiryRepositoryInterface::class, EloquentInquiryRepository::class);
        $this->app->bind(SettingRepositoryInterface::class, EloquentSettingRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
