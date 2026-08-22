<?php

namespace App\Repositories\Contracts;

interface CompanyProfileRepositoryInterface
{
    public function getProfile();
    public function updateProfile(array $data);
}
