<?php

namespace App\Repositories\Contracts;

interface InquiryRepositoryInterface
{
    public function getAll(array $filters = [], int $perPage = 15);
    public function getUnreadCount(): int;
    public function findById(int $id);
    public function create(array $data);
    public function updateStatus(int $id, string $status, ?string $notes = null);
    public function delete(int $id);
}
