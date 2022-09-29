<?php

namespace Eteacher\InvictaAdmin;

use Eteacher\InvictaAdmin\Facades\Menu;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class InvictaAdmin
{
    public static $assets = [];

    public static function jsonVariables()
    {
        return [
            'appUrl' => config('app.url'),
            'appName' => config('app.name'),
            'appPath' => config('invicta.path'),
            'impersonateRoute' => route('invicta.impersonate-leave'),
            // 'editorUrl' => route('editor'),
            // 'assetsUrl' => config('frontend.assetsUrl'),
            // 'screenshotsPath' => config('services.screenshots.key'),
            'menu' => self::menu(),
            'user' => self::user(),
            // 'brands' => self::brands(),
            // 'templates' => self::templates(),
            // 'languages' => self::languages(),
            // 'helper_links' => self::helperLinks(),
        ];
    }

    public static function user()
    {
        $user = auth()->user();

        return $user ? array_merge(
            $user->toArray(),
            [
                'is_dev' => method_exists($user, 'isDev') ? $user->isDev() : true,
                'permissions' => method_exists($user, 'permissions') ? $user->permissions() : [],
            ]
        ) : [];
    }

    /**
     * Build main admin navigation.
     *
     * @return  Illuminate\Support\Collection
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

    public static function svg($name, $attrs = null)
    {
        $nameIsPath = (Str::of($name)->endsWith('.svg'));
        $svgPath = $nameIsPath ? $name : __DIR__."/../resources/svg/{$name}.svg";

        $svg = Str::squish(File::get($svgPath));

        if ($nameIsPath) {
            return $svg;
        }

        if ($attrs) {
            $attrs = " class=\"{$attrs}\"";
        }

        return str_replace('<svg', sprintf('<svg%s', $attrs), $svg);
    }
}
