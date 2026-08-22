<?php

namespace App\Repositories\Eloquent;

use App\Models\CompanyProfile;
use App\Repositories\Contracts\CompanyProfileRepositoryInterface;

class EloquentCompanyProfileRepository implements CompanyProfileRepositoryInterface
{
    public function getProfile()
    {
        $profile = CompanyProfile::first();
        if (!$profile) {
            $profile = CompanyProfile::create([
                'company_name' => 'Sagayama Precision Co., Ltd.',
                'company_name_jp' => '株式会社サガヤマ',
                'president_name' => 'Takeshi Sagayama',
                'philosophy' => 'Menempa masa depan melalui ketelitian teknologi tanpa batas.',
                'vision' => 'Menjadi pionir manufaktur komponen presisi global terkemuka.',
                'mission' => 'Memberikan solusi rekayasa presisi tertinggi yang mendukung otomotif dan industri modern.',
            ]);
        }
        return $profile;
    }

    public function updateProfile(array $data)
    {
        $profile = $this->getProfile();
        $profile->update($data);
        return $profile;
    }
}
