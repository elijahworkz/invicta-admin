<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    /**
     * @var string[]
     */
    protected $fillable = [
        'title',
        'handle',
        'blueprint',
        'data',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'data' => 'array',
        ];
    }

    /**
     * clear global set cache.
     */
    public static function boot()
    {
        parent::boot();

        self::updated(function () {
            Cache::forget('sitekit_settings');
        });
    }
}
