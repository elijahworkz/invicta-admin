<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;
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
        'origin_id',
        'locale',
    ];

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

    public function scopeLocale($query)
    {
        return $query->where('locale', App::currentLocale());
    }

    public static function getFilterOptions($globalSet, $attribute, $id = 'slug', $label = 'title')
    {
        $options = [];

        $globalSet = gettype($globalSet) == 'string' ? global_set($globalSet, $attribute) : $globalSet[$attribute];

        if (! $globalSet) {
            return $options;
        }

        foreach ($globalSet as $global) {
            $options[$global[$id]] = $global[$label];
        }

        return $options;
    }

    public static function getBlueprintOptions($globalSet, $attribute, $id = 'slug', $label = 'title')
    {
        $globalSet = gettype($globalSet) == 'string' ? global_set($globalSet, $attribute) : $globalSet[$attribute];

        $options = ! empty($globalSet) ? collect($globalSet)->map(
            function ($item) use ($id, $label) {
                return ['label' => $item[$label], 'value' => $item[$id]];
            }
        ) : collect([]);

        return $options;
    }
}
