<?php

namespace App\Repositories\Eloquent;

use App\Models\BusinessUnit;
use App\Repositories\Contracts\BusinessRepositoryInterface;

class EloquentBusinessRepository implements BusinessRepositoryInterface
{
    public function getAll()
    {
        return BusinessUnit::ordered()->get();
    }

    public function findById(int $id)
    {
        return BusinessUnit::findOrFail($id);
    }

    public function findBySlug(string $slug)
    {
        return BusinessUnit::where('slug', $slug)->firstOrFail();
    }

    public function create(array $data)
    {
        return BusinessUnit::create($data);
    }

    public function update(int $id, array $data)
    {
        $business = $this->findById($id);
        $business->update($data);
        return $business;
    }

    public function delete(int $id)
    {
        $business = $this->findById($id);
        return $business->delete();
    }
}
