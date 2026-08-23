<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionProcess extends Model
{
    use HasFactory;

    protected $fillable = [
        'step_number',
        'category',
        'title_id',
        'title_jp',
        'title_en',
        'description_id',
        'description_jp',
        'description_en',
        'location_badge',
        'icon',
        'image_url',
        'specs',
        'order',
        'is_active',
    ];

    protected $casts = [
        'specs' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc')->orderBy('step_number', 'asc');
    }
}
