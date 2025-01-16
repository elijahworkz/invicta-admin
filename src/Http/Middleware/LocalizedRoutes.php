<?php

namespace Elijahworkz\InvictaAdmin\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;

class LocalizedRoutes
{
    public function handle($request, Closure $next)
    {
        $locales = array_keys(config('invicta.locales'));

        if (! empty($locales) && count($locales) > 1) {

            $maybeLocale = $request->segment(1);
            if (in_array($maybeLocale, $locales)) {
                App::setLocale($maybeLocale);
            }
        }

        return $next($request);
    }
}
