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
                'company_name' => 'PT. Sugiyama Indonesia',
                'company_name_jp' => '株式会社スギヤマ',
                'president_name' => 'Takeshi Sugiyama',
                'president_message' => 'Sebagai seorang ahli penempaan, kami akan merevolusi kualitas manufaktur presisi dunia melalui keterampilan teknis tanpa kompromi.',
                'president_photo_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
                'philosophy' => 'Menempa kualitas terbaik melalui penguasaan teknologi, dedikasi karyawan, dan kepuasan pelanggan yang berkelanjutan.',
                'vision' => 'Menjadi tolok ukur global dalam teknologi penempaan dingin dan komponen presisi masa depan.',
                'mission' => 'Menghadirkan produk presisi bernilai tambah tinggi dengan efisiensi sumber daya maksimal.',
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
