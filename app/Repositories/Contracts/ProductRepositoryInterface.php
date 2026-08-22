<?php

namespace App\Repositories\Contracts;

interface ProductRepositoryInterface
{
    public function getAll(array $filters = [], int $perPage = 12);
    public function getFeatured(int $limit = 6);
    public function findById(int $id);
    public function findBySlug(string $slug);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);

    // Categories
    public function getAllCategories();
    public function findCategoryById(int $id);
    public function findCategoryBySlug(string $slug);
    public function createCategory(array $data);
    public function updateCategory(int $id, array $data);
    public function deleteCategory(int $id);
}
