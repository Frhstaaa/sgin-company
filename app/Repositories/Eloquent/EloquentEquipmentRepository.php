<?php

namespace App\Repositories\Eloquent;

use App\Models\Equipment;
use App\Repositories\Contracts\EquipmentRepositoryInterface;

class EloquentEquipmentRepository implements EquipmentRepositoryInterface
{
    public function getAll()
    {
        return Equipment::ordered()->get();
    }

    public function getByCategory(string $category)
    {
        return Equipment::where('category', $category)->ordered()->get();
    }

    public function getCategories()
    {
        return Equipment::select('category')->distinct()->pluck('category');
    }

    public function findById(int $id)
    {
        return Equipment::findOrFail($id);
    }

    public function create(array $data)
    {
        return Equipment::create($data);
    }

    public function update(int $id, array $data)
    {
        $equipment = $this->findById($id);
        $equipment->update($data);
        return $equipment;
    }

    public function delete(int $id)
    {
        $equipment = $this->findById($id);
        return $equipment->delete();
    }
}
