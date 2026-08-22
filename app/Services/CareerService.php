<?php

namespace App\Services;

use App\Repositories\Contracts\CareerRepositoryInterface;
use Illuminate\Support\Str;

class CareerService
{
    public function __construct(
        protected CareerRepositoryInterface $repo
    ) {}

    public function getAll(bool $activeOnly = false)
    {
        return $this->repo->getAll($activeOnly);
    }

    public function findById(int $id)
    {
        return $this->repo->findById($id);
    }

    public function findBySlug(string $slug)
    {
        return $this->repo->findBySlug($slug);
    }

    public function create(array $data)
    {
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']) . '-' . Str::random(5);
        }
        return $this->repo->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->repo->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->repo->delete($id);
    }
}
