<?php

namespace App\Repositories\Contracts;

interface NewsRepositoryInterface
{
    public function getAll(array $filters = [], int $perPage = 10);
    public function getLatest(int $limit = 5);
    public function findById(int $id);
    public function findBySlug(string $slug);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}
