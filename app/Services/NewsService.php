<?php

namespace App\Services;

use App\Repositories\Contracts\NewsRepositoryInterface;
use Illuminate\Support\Str;

class NewsService
{
    public function __construct(
        protected NewsRepositoryInterface $repo,
        protected FileUploadService $fileUploadService
    ) {}

    public function getAll(array $filters = [], int $perPage = 10)
    {
        return $this->repo->getAll($filters, $perPage);
    }

    public function getLatest(int $limit = 5)
    {
        return $this->repo->getLatest($limit);
    }

    public function findById(int $id)
    {
        return $this->repo->findById($id);
    }

    public function findBySlug(string $slug)
    {
        return $this->repo->findBySlug($slug);
    }

    public function create(array $data, $coverImage = null)
    {
        if ($coverImage) {
            $data['cover_image'] = $this->fileUploadService->uploadImage($coverImage, 'news');
        }
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        if (empty($data['published_at'])) {
            $data['published_at'] = now()->toDateString();
        }
        return $this->repo->create($data);
    }

    public function update(int $id, array $data, $coverImage = null)
    {
        $existing = $this->repo->findById($id);
        if ($coverImage) {
            $this->fileUploadService->deleteImage($existing->cover_image);
            $data['cover_image'] = $this->fileUploadService->uploadImage($coverImage, 'news');
        } elseif (empty($data['cover_image'])) {
            unset($data['cover_image']);
        }
        if (empty($data['slug']) && !empty($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        return $this->repo->update($id, $data);
    }

    public function delete(int $id)
    {
        $existing = $this->repo->findById($id);
        $this->fileUploadService->deleteImage($existing->cover_image);
        return $this->repo->delete($id);
    }
}
