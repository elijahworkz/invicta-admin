<?php

namespace Elijahworkz\InvictaAdmin\Foundation;

use Elijahworkz\InvictaAdmin\InvictaAdmin;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

class Vite
{
    protected $buildTool = 'vite';

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
        if (is_file(invicta_path('public/hot'))) {
            $url = rtrim(file_get_contents(invicta_path('public/hot')));

            return new HtmlString(<<<HTML
                <script type="module" src="{$url}/@vite/client" crossorigin="use-credentials"></script>
                <script type="module" src="{$url}/resources/js/main.js" crossorigin="use-credentials"></script>
            HTML);
        }

        $manifest = json_decode(file_get_contents(
            public_path('vendor/invicta/manifest.json')
        ), true);

        return new HtmlString(<<<HTML
            <script type="module" src="/vendor/invicta/{$manifest['resources/js/main.js']['file']}"></script>
            <link rel="stylesheet" href="/vendor/invicta/{$manifest['resources/js/main.js']['css'][0]}">
        HTML);
    }

    public function preloadScripts()
    {
        if (is_file(invicta_path('public/hot'))) {
            $url = rtrim(file_get_contents(invicta_path('public/hot')));

            return new HtmlString(<<<HTML
                <link rel="modulepreload" href="{$url}/@vite/client">
                <link rel="modulepreload" href="{$url}/resources/js/main.js">
            HTML);
        }

        $manifest = json_decode(file_get_contents(
            public_path('vendor/invicta/manifest.json')
        ), true);

        return new HtmlString(<<<HTML
            <link rel="modulepreload" href="/vendor/invicta/{$manifest['resources/js/main.js']['file']}">
            <link rel="prefetch" href="/vendor/invicta/{$manifest['resources/js/main.js']['css'][0]}" as="style">
        HTML);
    }

    public function assets()
    {
        $this->buildTool = config('invicta.assets_build_tool');
        $entrypoints = InvictaAdmin::registeredAssets();

        if (empty($entrypoints)) {
            return;
        }

        static $manifests = [];

        $entrypoints = collect($entrypoints);
        $buildDirectory = Str::start(config('invicta.assets_build_directory'), '/');

        if (is_file(public_path('/hot'))) {
            $url = rtrim(file_get_contents(public_path('/hot')));

            return new HtmlString(
                $entrypoints
                    ->map(function ($entrypoint) use ($url) {
                        $entryUrl = Str::of($entrypoint)->contains(['http://', 'https://'])
                            ? $entrypoint
                            : "{$url}/{$entrypoint}";

                        return $this->makeTag($entryUrl);
                    })
                    ->prepend($this->makeScriptTag("{$url}/@vite/client"))
                    ->join('')
            );
        }

        $manifestPath = ($this->buildTool == 'mix')
            ? public_path('mix-manifest.json')
            : public_path($buildDirectory.'/manifest.json');

        if (! isset($manifests[$manifestPath])) {
            if (! is_file($manifestPath)) {
                throw new \Exception("Vite manifest not found at: {$manifestPath}");
            }

            $manifests[$manifestPath] = json_decode(file_get_contents($manifestPath), true);
        }

        $manifest = $manifests[$manifestPath];

        $tags = collect();

        foreach ($entrypoints as $entrypoint) {
            if (! isset($manifest[$entrypoint])) {
                // May be external link?
                if (Str::of($entrypoint)->contains(['http://', 'https://', '//'])) {
                    $tags->push($this->makeTag($entrypoint));

                    continue;
                } else {
                    throw new \Exception("Unable to locate file in manifest: {$entrypoint}.");
                }
            }

            if ($this->buildTool == 'vite') {
                $tags->push($this->makeTag(url("{$buildDirectory}/{$manifest[$entrypoint]['file']}")));

                if (isset($manifest[$entrypoint]['css'])) {
                    foreach ($manifest[$entrypoint]['css'] as $css) {
                        $tags->push($this->makeStylesheetTag(url("{$buildDirectory}/{$css}")));
                    }
                }

                if (isset($manifest[$entrypoint]['imports'])) {
                    foreach ($manifest[$entrypoint]['imports'] as $import) {
                        if (isset($manifest[$import]['css'])) {
                            foreach ($manifest[$import]['css'] as $css) {
                                $tags->push($this->makeStylesheetTag(url("{$buildDirectory}/{$css}")));
                            }
                        }
                    }
                }
            }

            if ($this->buildTool == 'mix') {
                $tags->push($this->makeTag(url("{$manifest[$entrypoint]}")));
            }
        }

        [$stylesheets, $scripts] = $tags->partition(fn ($tag) => str_starts_with($tag, '<link'));

        return new HtmlString($stylesheets->join('').$scripts->join(''));
    }

    /**
     * Generate an appropriate tag for the given URL.
     *
     * @param  string  $url
     * @return string
     */
    protected function makeTag($url)
    {
        if ($this->isCssPath($url)) {
            return $this->makeStylesheetTag($url);
        }

        return $this->makeScriptTag($url);
    }

    /**
     * Generate a script tag for the given URL.
     *
     * @param  string  $url
     * @return string
     */
    protected function makeScriptTag($url)
    {
        return sprintf('<script%s src="%s"></script>', $this->buildTool == 'vite' ? ' type="module"' : '', $url);
    }

    /**
     * Generate a stylesheet tag for the given URL.
     *
     * @param  string  $url
     * @return string
     */
    protected function makeStylesheetTag($url)
    {
        return sprintf('<link rel="stylesheet" href="%s" />', $url);
    }

    /**
     * Determine whether the given path is a CSS file.
     *
     * @param  string  $path
     * @return bool
     */
    protected function isCssPath($path)
    {
        return preg_match('/\.(css|less|sass|scss|styl|stylus|pcss|postcss)$/', $path) === 1;
    }
}
