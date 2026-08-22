<?php

namespace App\Repositories\Eloquent;

use App\Models\Technology;
use App\Repositories\Contracts\TechnologyRepositoryInterface;

class EloquentTechnologyRepository implements TechnologyRepositoryInterface
{
    public function getAll()
    {
        return Technology::ordered()->get();
    }

    public function findById(int $id)
    {
        return Technology::findOrFail($id);
    }

    public function findBySlug(string $slug)
    {
        return Technology::where('slug', $slug)->firstOrFail();
    }

    public function create(array $data)
    {
        return Technology::create($data);
    }

    public function update(int $id, array $data)
    {
        $tech = $this->findById($id);
        $tech->update($data);
        return $tech;
    }

    public function delete(int $id)
    {
        $tech = $this->findById($id);
        return $tech->delete();
    }
}
