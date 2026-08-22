<?php

namespace App\Repositories\Eloquent;

use App\Models\News;
use App\Repositories\Contracts\NewsRepositoryInterface;

class EloquentNewsRepository implements NewsRepositoryInterface
{
    public function getAll(array $filters = [], int $perPage = 10)
    {
        $query = News::query();

        if (isset($filters['published_only']) && $filters['published_only']) {
            $query->published();
        }

        if (!empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        return $query->orderBy('published_at', 'desc')->paginate($perPage);
    }

    public function getLatest(int $limit = 5)
    {
        return News::published()->limit($limit)->get();
    }

    public function findById(int $id)
    {
        return News::findOrFail($id);
    }

    public function findBySlug(string $slug)
    {
        return News::where('slug', $slug)->firstOrFail();
    }

    public function create(array $data)
    {
        return News::create($data);
    }

    public function update(int $id, array $data)
    {
        $news = $this->findById($id);
        $news->update($data);
        return $news;
    }

    public function delete(int $id)
    {
        $news = $this->findById($id);
        return $news->delete();
    }
}
