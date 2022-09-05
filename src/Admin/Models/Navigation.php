<?php

namespace Eteacher\InvictaAdmin\Admin\Models;

use Illuminate\Database\Eloquent\Model;

class Navigation extends Model
{
    protected $table = 'navigation';

    protected $fillable = [
        'title', 'handle',
    ];

    protected $casts = [
        'tree' => 'array',
    ];
}
