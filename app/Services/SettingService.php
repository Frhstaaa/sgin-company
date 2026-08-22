<?php

namespace App\Services;

use App\Repositories\Contracts\SettingRepositoryInterface;

class SettingService
{
    public function __construct(
        protected SettingRepositoryInterface $repo,
        protected FileUploadService $fileUploadService
    ) {}

    public function getAll()
    {
        return $this->repo->getAll();
    }

    public function getGroup(string $group)
    {
        return $this->repo->getGroup($group);
    }

    public function get(string $key, $default = null)
    {
        return $this->repo->get($key, $default);
    }

    public function set(string $key, $value, string $group = 'general', string $type = 'text')
    {
        return $this->repo->set($key, $value, $group, $type);
    }

    public function updateMultiple(array $settings, array $files = [])
    {
        foreach ($settings as $key => $value) {
            $this->repo->set($key, $value);
        }

        foreach ($files as $key => $file) {
            if ($file) {
                $url = $this->fileUploadService->uploadImage($file, 'settings');
                $this->repo->set($key, $url, 'branding', 'image');
            }
        }

        return true;
    }
}
