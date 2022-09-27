<?php

use Eteacher\InvictaAdmin\Admin\Models\GlobalSetting;

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
    function global_set($handle, $argument = null)
    {
        $cachedSet = Cache::rememberForever('global_set_'.$handle, function () use ($handle) {
            $model = GlobalSetting::where('handle', $handle)->first();

            if ($model) {
                return $model->content;
            }

            return null;
        });

        if ($cachedSet && $argument) {
            return $cachedSet[$argument];
        }

        return $cachedSet;
    }
}
