<?php

namespace Eteacher\InvictaAdmin;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\HtmlString;

class InvictaAdmin
{
    public static function scripts(): HtmlString
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
            public_path('build/manifest.json')
        ), true);

        return new HtmlString(<<<HTML
            <script type="module" src="/build/{$manifest['resources/js/main.ts']['file']}"></script>
            <link rel="stylesheet" href="/build/{$manifest['resources/js/main.ts']['css'][0]}">
        HTML);
    }

    public static function jsonVariables()
    {
        return [
            'auth' => self::auth(),
            // 'appUrl' => config('app.url'),
            // 'appName' => config('app.name'),
            // 'editorUrl' => route('editor'),
            // 'assetsUrl' => config('frontend.assetsUrl'),
            // 'screenshotsPath' => config('services.screenshots.key'),
            'routes' => self::routes(),
            // 'brands' => self::brands(),
            // 'templates' => self::templates(),
            // 'languages' => self::languages(),
            // 'helper_links' => self::helperLinks(),
        ];
    }

    private static function auth()
    {
        $user = Auth::user();

        if (! $user) {
            return [];
        }

        return [
            'id' => $user->id,
            'name' => $user->name,
            'role' => $user->role->label,
        ];
    }

    private static function routes()
    {
        /*
        what do we need here.
        - do we collect all routes from application
        - do we have some default routes from package?
        - how do we authorize the routes
        - 
        */
    }
}
