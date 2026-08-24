<?php

namespace App\Services;

use App\Repositories\Contracts\TechnologyRepositoryInterface;
use Illuminate\Support\Str;

class TechnologyService
{
    public function __construct(
        protected TechnologyRepositoryInterface $repo,
        protected FileUploadService $fileUploadService
    ) {}

    public function getAll()
    {
        return $this->repo->getAll();
    }

    public function findById(int $id)
    {
        return $this->repo->findById($id);
    }

    public function findBySlug(string $slug)
    {
        return $this->repo->findBySlug($slug);
    }

    public function create(array $data, $imageFile = null)
    {
        if ($imageFile) {
            $data['image_url'] = $this->fileUploadService->uploadImage($imageFile, 'technologies');
        }
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        return $this->repo->create($data);
    }

    public function update(int $id, array $data, $imageFile = null)
    {
        $existing = $this->repo->findById($id);
        if ($imageFile) {
            $this->fileUploadService->deleteImage($existing->image_url);
            $data['image_url'] = $this->fileUploadService->uploadImage($imageFile, 'technologies');
        } elseif (empty($data['image_url'])) {
            unset($data['image_url']);
        }
        if (empty($data['slug']) && !empty($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        return $this->repo->update($id, $data);
    }

    public function delete(int $id)
    {
        $existing = $this->repo->findById($id);
        $this->fileUploadService->deleteImage($existing->image_url);
        return $this->repo->delete($id);
    }
}
