<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Technology extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'step_number',
        'title',
        'title_jp',
        'short_description',
        'content',
        'features',
        'image_url',
        'icon',
        'order',
    ];

    protected $casts = [
        'features' => 'array',
        'order' => 'integer',
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
