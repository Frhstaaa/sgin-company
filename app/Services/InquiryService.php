<?php

namespace App\Services;

use App\Repositories\Contracts\InquiryRepositoryInterface;

class InquiryService
{
    public function __construct(
        protected InquiryRepositoryInterface $repo
    ) {}

    public function getAll(array $filters = [], int $perPage = 15)
    {
        return $this->repo->getAll($filters, $perPage);
    }

    public function getUnreadCount(): int
    {
        return $this->repo->getUnreadCount();
    }

    public function findById(int $id)
    {
        return $this->repo->findById($id);
    }

    public function create(array $data)
    {
        return $this->repo->create($data);
    }

    public function updateStatus(int $id, string $status, ?string $notes = null)
    {
        return $this->repo->updateStatus($id, $status, $notes);
    }

    public function delete(int $id)
    {
        return $this->repo->delete($id);
    }
}
