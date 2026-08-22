<?php

namespace App\Services;

use App\Repositories\Contracts\CompanyProfileRepositoryInterface;

class CompanyProfileService
{
    public function __construct(
        protected CompanyProfileRepositoryInterface $repo,
        protected FileUploadService $fileUploadService
    ) {}

    public function getProfile()
    {
        return $this->repo->getProfile();
    }

    public function updateProfile(array $data, $presidentPhoto = null)
    {
        $existing = $this->repo->getProfile();
        if ($presidentPhoto) {
            $this->fileUploadService->deleteImage($existing->president_photo_url);
            $data['president_photo_url'] = $this->fileUploadService->uploadImage($presidentPhoto, 'profile');
        }
        return $this->repo->updateProfile($data);
    }
}
