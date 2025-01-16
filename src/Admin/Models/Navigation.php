<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class Navigation extends Model
{
    protected $table = 'navigation';

    protected $fillable = [
        'title', 'handle', 'locale', 'origin_id',
    ];

    protected $casts = [
        'tree' => 'array',
    ];

    public function scopeLocale($query)
    {
        return $query->where('locale', App::currentLocale());
    }
}
