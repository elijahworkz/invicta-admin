<?php

namespace Elijahworkz\InvictaAdmin;

use Elijahworkz\InvictaAdmin\Facades\Menu;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class InvictaAdmin
{
    public static $assets = [];

    public static function appVariables()
    {
        return [
            'appUrl' => config('app.url'),
            'appName' => config('invicta.name'),
            'appVersion' => self::version(),
            'appProductionUrl' => config('app.production_url') ?? config('app.url'),
            'appPath' => config('invicta.path'),
            'impersonator' => session('impersonator_id'),
            'impersonateRoute' => route('invicta.impersonate-leave'),
            'menu' => self::menu(),
            'user' => base64_encode(json_encode(self::user())),
            'assetsSettings' => self::assetsSettings(),
            'locales' => config('invicta.locales'),
            'currentLocale' => App::currentLocale(),
        ];
    }

    public static function user()
    {
        $user = request()->user();

        return $user ? array_merge(
            $user->toArray(),
            [
                'is_dev' => method_exists($user, 'isDev') ? $user->isDev() : true,
                'permissions' => method_exists($user, 'permissions') ? $user->permissions() : [],
                'data' => $user->data ?? [],
            ]
        ) : [];
    }

    public static function version()
    {
        return \Composer\InstalledVersions::getVersion('elijahworkz/invicta-admin');
    }

    /**
     * Build main admin navigation.
     *
     * @return Illuminate\Support\Collection
     */
    private static function menu()
    {
        return Menu::build();
    }

    public static function assets($path)
    {
        if (is_array($path)) {
            static::$assets = array_merge(static::$assets, $path);
        } else {
            static::$assets[] = $path;
        }
    }

    public static function registeredAssets()
    {
        return static::$assets;
    }

    public static function assetsSettings()
    {
        $accept = 'image/*,audio/*';
        if (is_array(config('invicta.assets_documents'))) {
            $accept .= implode(',', config('invicta.assets_documents'));
        }

        return [
            'multiupload' => config('invicta.assets_multi_upload'),
            'accept' => $accept,
        ];
    }

    public static function svg($name, $attrs = null)
    {
        $nameIsPath = (Str::of($name)->endsWith('.svg'));
        $svgPath = $nameIsPath ? $name : __DIR__."/../resources/svg/{$name}.svg";
        $attrStr = '';

        $svg = Str::squish(File::get($svgPath));

        if ($nameIsPath) {
            return $svg;
        }

        if ($attrs) {
            if (is_array($attrs)) {
                foreach ($attrs as $key => $value) {
                    $attrStr .= " {$key}=\"{$value}\"";
                }
            } else {
                $attrStr = " class=\"{$attrs}\"";
            }
        }

        return str_replace('<svg', sprintf('<svg%s', $attrStr), $svg);
    }
}
