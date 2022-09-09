<?php

namespace Eteacher\InvictaAdmin\Admin\Models;

use Illuminate\Database\Eloquent\Model;

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
}
