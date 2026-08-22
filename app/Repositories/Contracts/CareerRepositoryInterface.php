<?php

namespace App\Repositories\Contracts;

interface CareerRepositoryInterface
{
    public function getAll(bool $activeOnly = false);
    public function findById(int $id);
    public function findBySlug(string $slug);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}
