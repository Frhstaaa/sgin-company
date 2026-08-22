<?php

namespace App\Repositories\Eloquent;

use App\Models\HeroSlide;
use App\Repositories\Contracts\HeroRepositoryInterface;

class EloquentHeroRepository implements HeroRepositoryInterface
{
    public function getAll()
    {
        return HeroSlide::orderBy('order', 'asc')->get();
    }

    public function getActive()
    {
        return HeroSlide::active()->get();
    }

    public function findById(int $id)
    {
        return HeroSlide::findOrFail($id);
    }

    public function create(array $data)
    {
        return HeroSlide::create($data);
    }

    public function update(int $id, array $data)
    {
        $slide = $this->findById($id);
        $slide->update($data);
        return $slide;
    }

    public function delete(int $id)
    {
        $slide = $this->findById($id);
        return $slide->delete();
    }
}
