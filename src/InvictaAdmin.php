<?php

namespace Eteacher\InvictaAdmin;

use Eteacher\InvictaAdmin\Admin\Facades\Menu;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\HtmlString;
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

    public static function applicationScripts(): HtmlString
    {
        $devServerRunning = false;
        $devServerUrl = config('invicta.dev_server_url');

        if (app()->environment('local')) {
            try {
                Http::get($devServerUrl);
                $devServerRunning = true;
            } catch (ConnectionException $e) {
            }
        }

        if ($devServerRunning) {
            return new HtmlString(<<<HTML
                <script type="module" src="{$devServerUrl}/@vite/client" crossorigin="use-credentials"></script>
                <script type="module" src="{$devServerUrl}/resources/js/main.ts" crossorigin="use-credentials"></script>
            HTML);
        }

        $manifest = json_decode(file_get_contents(
            public_path('vendor/invicta/manifest.json')
        ), true);

        return new HtmlString(<<<HTML
            <script type="module" src="/vendor/invicta/{$manifest['resources/js/main.ts']['file']}"></script>
            <link rel="stylesheet" href="/vendor/invicta/{$manifest['resources/js/main.ts']['css'][0]}">
        HTML);
    }
}
