<?php

namespace App\Repositories\Eloquent;

use App\Models\Career;
use App\Repositories\Contracts\CareerRepositoryInterface;

class EloquentCareerRepository implements CareerRepositoryInterface
{
    public function getAll(bool $activeOnly = false)
    {
        $query = Career::query();
        if ($activeOnly) {
            $query->active();
        } else {
            $query->orderBy('created_at', 'desc');
        }
        return $query->get();
    }

    public function findById(int $id)
    {
        return Career::findOrFail($id);
    }

    public function findBySlug(string $slug)
    {
        return Career::where('slug', $slug)->firstOrFail();
    }

    public function create(array $data)
    {
        return Career::create($data);
    }

    public function update(int $id, array $data)
    {
        $career = $this->findById($id);
        $career->update($data);
        return $career;
    }

    public function delete(int $id)
    {
        $career = $this->findById($id);
        return $career->delete();
    }
}
