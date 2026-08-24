<?php

namespace App\Services;

use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Support\Str;

class ProductService
{
    public function __construct(
        protected ProductRepositoryInterface $repo,
        protected FileUploadService $fileUploadService
    ) {}

    public function getAll(array $filters = [], int $perPage = 12)
    {
        return $this->repo->getAll($filters, $perPage);
    }

    public function getFeatured(int $limit = 6)
    {
        return $this->repo->getFeatured($limit);
    }

    public function findById(int $id)
    {
        return $this->repo->findById($id);
    }

    public function findBySlug(string $slug)
    {
        return $this->repo->findBySlug($slug);
    }

    public function create(array $data, $imageFile = null, array $galleryFiles = [])
    {
        if ($imageFile) {
            $data['image_url'] = $this->fileUploadService->uploadImage($imageFile, 'products');
        }
        if (!empty($galleryFiles)) {
            $galleryUrls = [];
            foreach ($galleryFiles as $file) {
                $galleryUrls[] = $this->fileUploadService->uploadImage($file, 'products/gallery');
            }
            $data['gallery'] = $galleryUrls;
        }
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        return $this->repo->create($data);
    }

    public function update(int $id, array $data, $imageFile = null, array $galleryFiles = [])
    {
        $existing = $this->repo->findById($id);
        if ($imageFile) {
            $this->fileUploadService->deleteImage($existing->image_url);
            $data['image_url'] = $this->fileUploadService->uploadImage($imageFile, 'products');
        } elseif (empty($data['image_url'])) {
            unset($data['image_url']);
        }
        if (!empty($galleryFiles)) {
            $galleryUrls = $existing->gallery ?? [];
            foreach ($galleryFiles as $file) {
                $galleryUrls[] = $this->fileUploadService->uploadImage($file, 'products/gallery');
            }
            $data['gallery'] = $galleryUrls;
        }
        if (empty($data['slug']) && !empty($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        return $this->repo->update($id, $data);
    }

    public function delete(int $id)
    {
        $existing = $this->repo->findById($id);
        $this->fileUploadService->deleteImage($existing->image_url);
        if (!empty($existing->gallery)) {
            foreach ($existing->gallery as $img) {
                $this->fileUploadService->deleteImage($img);
            }
        }
        return $this->repo->delete($id);
    }

    // Categories
    public function getAllCategories()
    {
        return $this->repo->getAllCategories();
    }

    public function findCategoryById(int $id)
    {
        return $this->repo->findCategoryById($id);
    }

    public function findCategoryBySlug(string $slug)
    {
        return $this->repo->findCategoryBySlug($slug);
    }

    public function createCategory(array $data, $imageFile = null)
    {
        if ($imageFile) {
            $data['image_url'] = $this->fileUploadService->uploadImage($imageFile, 'categories');
        }
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        return $this->repo->createCategory($data);
    }

    public function updateCategory(int $id, array $data, $imageFile = null)
    {
        $existing = $this->repo->findCategoryById($id);
        if ($imageFile) {
            $this->fileUploadService->deleteImage($existing->image_url);
            $data['image_url'] = $this->fileUploadService->uploadImage($imageFile, 'categories');
        }
        if (empty($data['slug']) && !empty($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        return $this->repo->updateCategory($id, $data);
    }

    public function deleteCategory(int $id)
    {
        $existing = $this->repo->findCategoryById($id);
        $this->fileUploadService->deleteImage($existing->image_url);
        return $this->repo->deleteCategory($id);
    }
}
