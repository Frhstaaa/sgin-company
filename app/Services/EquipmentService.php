<?php

namespace App\Services;

use App\Repositories\Contracts\EquipmentRepositoryInterface;

class EquipmentService
{
    public function __construct(
        protected EquipmentRepositoryInterface $repo,
        protected FileUploadService $fileUploadService
    ) {}

    public function getAll()
    {
        return $this->repo->getAll();
    }

    public function getByCategory(string $category)
    {
        return $this->repo->getByCategory($category);
    }

    public function getCategories()
    {
        return $this->repo->getCategories();
    }

    public function findById(int $id)
    {
        return $this->repo->findById($id);
    }

    public function create(array $data, $imageFile = null)
    {
        if ($imageFile) {
            $data['image_url'] = $this->fileUploadService->uploadImage($imageFile, 'equipment');
        }
        return $this->repo->create($data);
    }

    public function update(int $id, array $data, $imageFile = null)
    {
        $existing = $this->repo->findById($id);
        if ($imageFile) {
            $this->fileUploadService->deleteImage($existing->image_url);
            $data['image_url'] = $this->fileUploadService->uploadImage($imageFile, 'equipment');
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
