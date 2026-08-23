<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'career_id',
        'position_title',
        'full_name',
        'email',
        'phone',
        'date_of_birth',
        'gender',
        'last_education',
        'major',
        'years_of_experience',
        'current_company',
        'expected_salary',
        'cv_path',
        'portfolio_url',
        'cover_letter',
        'status',
        'admin_notes',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    protected $appends = [
        'cv_url',
    ];

    public function career()
    {
        return $this->belongsTo(Career::class, 'career_id');
    }

    public function getCvUrlAttribute(): ?string
    {
        if (!$this->cv_path) {
            return null;
        }

        if (filter_var($this->cv_path, FILTER_VALIDATE_URL)) {
            return $this->cv_path;
        }

        return url('storage/' . ltrim($this->cv_path, '/'));
    }

    public function scopeFilter($query, array $filters)
    {
        if (!empty($filters['status']) && $filters['status'] !== 'all') {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['career_id'])) {
            $query->where('career_id', $filters['career_id']);
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('position_title', 'like', "%{$search}%");
            });
        }

        return $query;
    }
}
