<?php

namespace App\Repositories\Contracts;

interface HeroRepositoryInterface
{
    public function getAll();
    public function getActive();
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}
