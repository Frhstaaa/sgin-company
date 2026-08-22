<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'company_name_jp',
        'president_name',
        'president_message',
        'president_photo_url',
        'philosophy',
        'vision',
        'mission',
        'history_timeline',
        'certifications',
        'branches',
        'capital',
        'established_date',
        'employees_count',
    ];

    protected $casts = [
        'history_timeline' => 'array',
        'certifications' => 'array',
        'branches' => 'array',
    ];
}
