<?php

namespace Eteacher\InvictaAdmin\Admin\Foundation;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\HtmlString;

class Vite
{
    /**
     * Generate invicta scripts.
     *
     *
     * @return \Illuminate\Support\HtmlString
     *
     * @throws \ConnectionException
     */
    public function __invoke()
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
