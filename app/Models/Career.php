<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'department',
        'employment_type',
        'location',
        'requirements',
        'responsibilities',
        'benefits',
        'salary_range',
        'deadline',
        'is_active',
    ];

    protected $casts = [
        'requirements' => 'array',
        'responsibilities' => 'array',
        'benefits' => 'array',
        'deadline' => 'date',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('created_at', 'desc');
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class, 'career_id');
    }
}

