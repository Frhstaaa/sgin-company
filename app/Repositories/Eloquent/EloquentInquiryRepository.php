<?php

namespace App\Repositories\Eloquent;

use App\Models\Inquiry;
use App\Repositories\Contracts\InquiryRepositoryInterface;

class EloquentInquiryRepository implements InquiryRepositoryInterface
{
    public function getAll(array $filters = [], int $perPage = 15)
    {
        $query = Inquiry::with('product');

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function getUnreadCount(): int
    {
        return Inquiry::unread()->count();
    }

    public function findById(int $id)
    {
        return Inquiry::with('product')->findOrFail($id);
    }

    public function create(array $data)
    {
        return Inquiry::create($data);
    }

    public function updateStatus(int $id, string $status, ?string $notes = null)
    {
        $inquiry = $this->findById($id);
        $update = ['status' => $status];
        if ($notes !== null) {
            $update['admin_notes'] = $notes;
        }
        $inquiry->update($update);
        return $inquiry;
    }

    public function delete(int $id)
    {
        $inquiry = $this->findById($id);
        return $inquiry->delete();
    }
}
