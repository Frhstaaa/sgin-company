<?php

namespace App\Repositories\Contracts;

interface EquipmentRepositoryInterface
{
    public function getAll();
    public function getByCategory(string $category);
    public function getCategories();
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}
