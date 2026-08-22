<?php

namespace App\Repositories\Eloquent;

use App\Models\CompanyStat;
use App\Repositories\Contracts\StatRepositoryInterface;

class EloquentStatRepository implements StatRepositoryInterface
{
    public function getAll()
    {
        return CompanyStat::ordered()->get();
    }

    public function findById(int $id)
    {
        return CompanyStat::findOrFail($id);
    }

    public function create(array $data)
    {
        return CompanyStat::create($data);
    }

    public function update(int $id, array $data)
    {
        $stat = $this->findById($id);
        $stat->update($data);
        return $stat;
    }

    public function delete(int $id)
    {
        $stat = $this->findById($id);
        return $stat->delete();
    }
}
