<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyStat extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_jp',
        'title_id',
        'value',
        'unit',
        'subtext',
        'icon',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
