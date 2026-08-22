<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'slug',
        'sku',
        'name',
        'name_jp',
        'material',
        'application',
        'tolerance',
        'specs',
        'image_url',
        'gallery',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'specs' => 'array',
        'gallery' => 'array',
        'is_featured' => 'boolean',
        'order' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class, 'product_id');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true)->orderBy('order', 'asc');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
