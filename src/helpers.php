<?php

use Elijahworkz\InvictaAdmin\InvictaAdmin;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Fluent;
use Illuminate\Support\Str;

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

if (! function_exists('site_url')) {
    function site_url($url, $params = [])
    {
        $params = (! empty($params))
            ? '?'.http_build_query($params)
            : '';

        $urlStr = Str::of($url.$params);

        if ($urlStr->contains('http') || $urlStr->contains('#')) {
            return $url;
        }

        if ($urlStr->contains('home')) {
            return locale()->url;
        }

        // we need to set menu links to be always full url in order to prevent magazine overlap
        return $urlStr;
    }
}

if (! function_exists('getUrl')) {
    function resourceUrl($url)
    {
        if (Str::contains($url, '::')) {
            [$resource, $id] = explode('::', $url);

            $result = DB::table($resource)->where('id', $id)->select('uri')->first();

            if (empty($result)) {
                return url()->current();
            }

            return site_url($result->uri);
        }

        return str($url)->contains('http') ? $url : site_url($url);
    }
}

if (! function_exists('settings')) {
    function settings($handle, $attribute = null, $default = null)
    {
        return InvictaAdmin::settings($handle, $attribute, $default);
    }
}

if (! function_exists('global_set')) {
    function global_set($handle, $attribute = null, $default = null)
    {
        return InvictaAdmin::global_set($handle, $attribute, $default);
    }
}

if (! function_exists('locales')) {
    function locales()
    {
        return once(function () {
            return collect(config('invicta.locales'));

        });
    }
}

if (! function_exists('locale')) {
    function locale($attribute = null)
    {
        return once(function () use ($attribute) {
            $locales = locales();
            $locale = $locales[App::currentLocale()];

            return $attribute ? $locale[$attribute] : new Fluent($locale);
        });
    }
}
