<?php

use Elijahworkz\InvictaAdmin\Admin\Models\GlobalSetting;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Fluent;

function invicta_path($path = null)
{
    return __DIR__.'/../'.$path;
}

function invicta_user_model()
{
    $provider = config('auth.guards')[config('invicta.auth.guard')]['provider'];

    return config('auth.providers')[$provider]['model'];
}

function invicta_route($name, $params = [])
{
    return route('invicta.'.$name, $params);
}

if (! function_exists('global_set')) {
    function global_set($handle, $attribute = null)
    {
        $locale = App::currentLocale();
        $cachedSets = Cache::rememberForever('global_set_'.$handle, function () use ($handle) {
            return GlobalSetting::where('handle', $handle)->get()->keyBy('locale');
        });

        $cacheHandle = implode('_', ['global', 'set', $handle, $locale]);
        $cachedSet = Cache::rememberForever($cacheHandle, function () use ($cachedSets, $locale) {
            if ($cachedSets) {
                $set = (isset($cachedSets[$locale])) ? $cachedSets[$locale] : $cachedSets->first();

                return new Fluent($set->data);
            }

            return null;
        });

        if ($cachedSet && $attribute) {
            return $cachedSet[$attribute];
        }

        return $cachedSet;
    }
}
