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
        'data',
    ];

    /**
     * @var string[]
     */
    protected $hidden = ['id'];

    /**
     * @var string[]
     */
    protected $casts = [
        'data' => 'array',
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

    public static function getFilterOptions($globalSet, $attribute, $id = 'slug', $label = 'title')
    {
        $globalSet = global_set($globalSet, $attribute);

        foreach ($globalSet as $global) {
            $options[$global[$id]] = $global[$label];
        }

        return $options;
    }

    public static function getBlueprintOptions($globalSet, $attribute, $id = 'slug', $label = 'title')
    {
        $globalSet = global_set($globalSet, $attribute);

        $options = ! empty($globalSet) ? collect($globalSet)->map(
            function ($item) use ($id, $label) {
                return ['label' => $item[$label], 'value' => $item[$id]];
            }
        ) : collect([]);

        return $options;
    }
}
