<?php

use Elijahworkz\InvictaAdmin\Admin\Models\GlobalSetting;

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
            $model = GlobalSetting::where('handle', $handle)->first();

            if ($model) {
                return $model->data;
            }

            return null;
        });

        if ($cachedSet && $attribute) {
            return $cachedSet[$attribute];
        }

        return $cachedSet;
    }
}
