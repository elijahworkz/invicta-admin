<?php

namespace Eteacher\InvictaAdmin;

use Eteacher\InvictaAdmin\Admin\Facades\Menu;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class InvictaAdmin
{
    public static $scripts = [];

    public static $styles = [];

    public static function jsonVariables()
    {
        return [
            'appUrl' => config('app.url'),
            'appName' => config('app.name'),
            'appPath' => config('invicta.path'),
            // 'editorUrl' => route('editor'),
            // 'assetsUrl' => config('frontend.assetsUrl'),
            // 'screenshotsPath' => config('services.screenshots.key'),
            'menu' => self::menu(),
            // 'brands' => self::brands(),
            // 'templates' => self::templates(),
            // 'languages' => self::languages(),
            // 'helper_links' => self::helperLinks(),
        ];
    }

    private static function menu()
    {
        return Menu::build();
    }

    public static function vendorAssetUrl($url)
    {
        return asset('vendor/invicta/'.$url);
    }

    public static function script($name, $path)
    {
        static::$scripts[$name][] = Str::finish($path, '.js');
    }

    public static function registeredScripts()
    {
        return static::$scripts;
    }

    public static function style($name, $path)
    {
        static::$styles[$name][] = Str::finish($path, '.css');
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
