<?php

namespace App\Repositories\Eloquent;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Repositories\Contracts\ProductRepositoryInterface;

class EloquentProductRepository implements ProductRepositoryInterface
{
    public function getAll(array $filters = [], int $perPage = 12)
    {
        $query = Product::with('category');

        if (!empty($filters['category'])) {
            $query->whereHas('category', function ($q) use ($filters) {
                $q->where('slug', $filters['category']);
            });
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('name_jp', 'like', "%{$search}%")
                  ->orWhere('material', 'like', "%{$search}%")
                  ->orWhere('application', 'like', "%{$search}%");
            });
        }

        if (isset($filters['featured']) && $filters['featured']) {
            $query->where('is_featured', true);
        }

        return $query->orderBy('order', 'asc')->paginate($perPage);
    }

    public function getFeatured(int $limit = 6)
    {
        return Product::with('category')->featured()->limit($limit)->get();
    }

    public function findById(int $id)
    {
        return Product::with('category')->findOrFail($id);
    }

    public function findBySlug(string $slug)
    {
        return Product::with('category')->where('slug', $slug)->firstOrFail();
    }

    public function create(array $data)
    {
        return Product::create($data);
    }

    public function update(int $id, array $data)
    {
        $product = $this->findById($id);
        $product->update($data);
        return $product;
    }

    public function delete(int $id)
    {
        $product = $this->findById($id);
        return $product->delete();
    }

    // Categories
    public function getAllCategories()
    {
        return ProductCategory::withCount('products')->ordered()->get();
    }

    public function findCategoryById(int $id)
    {
        return ProductCategory::with('products')->findOrFail($id);
    }

    public function findCategoryBySlug(string $slug)
    {
        return ProductCategory::with('products')->where('slug', $slug)->firstOrFail();
    }

    public function createCategory(array $data)
    {
        return ProductCategory::create($data);
    }

    public function updateCategory(int $id, array $data)
    {
        $category = $this->findCategoryById($id);
        $category->update($data);
        return $category;
    }

    public function deleteCategory(int $id)
    {
        $category = $this->findCategoryById($id);
        return $category->delete();
    }
}
