<?php

use Eteacher\InvictaAdmin\Admin\Models\Resources\GlobalSetting;
use Illuminate\Support\Facades\App;

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
            $resource = App::make(GlobalSetting::class);

            $model = $resource->model()->where('handle', $handle)->first();

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
