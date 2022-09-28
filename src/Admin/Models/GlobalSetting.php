<?php

namespace Eteacher\InvictaAdmin\Admin\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class GlobalSetting extends Model
{
    /**
     * @var string
     */
    protected $table = 'global_settings';

    /**
     * @var string[]
     */
    protected $fillable = [
        'title',
        'handle',
        'blueprint',
        'content',
    ];

    /**
     * @var string[]
     */
    protected $hidden = ['id'];

    /**
     * @var string[]
     */
    protected $casts = [
        'content' => 'array',
    ];

    /**
     * clear global set cache.
     */
    public static function boot()
    {
        parent::boot();

        self::updated(function ($model) {
            Cache::forget('global_set_'.$model->handle);
        });
    }
}
