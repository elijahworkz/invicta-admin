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
        $cachedSet = Cache::rememberForever('global_set_'.$handle, function () use ($handle) {
            $sets = GlobalSetting::where('handle', $handle)->get()->keyBy('locale');

            if ($sets) {

                $locale = App::currentLocale();
                $set = (isset($sets[$locale])) ? $sets[$locale] : $sets->first();

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
