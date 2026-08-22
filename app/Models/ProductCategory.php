<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'name_jp',
        'description',
        'image_url',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'category_id')->orderBy('order', 'asc');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
