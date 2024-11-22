<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models;

use Illuminate\Database\Eloquent\Model;

class Navigation extends Model
{
    protected $table = 'navigation';

    protected $fillable = [
        'title', 'handle', 'locale', 'origin_id',
    ];

    protected $casts = [
        'tree' => 'array',
    ];
}
