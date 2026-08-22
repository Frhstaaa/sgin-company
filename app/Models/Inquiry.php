<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'company_name',
        'email',
        'phone',
        'subject',
        'message',
        'product_id',
        'status',
        'admin_notes',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function scopeUnread($query)
    {
        return $query->where('status', 'unread');
    }
}
