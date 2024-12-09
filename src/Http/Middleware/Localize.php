<?php

namespace Elijahworkz\InvictaAdmin\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class Localize
{
    public function handle($request, Closure $next)
    {
        $locales = array_keys(config('invicta.locales'));

        if (! empty($locales) && count($locales) > 1) {
            $locale = null;

            if ($request->has('locale') && in_array($request->locale, $locales)) {
                $locale = $request->locale;
                Session::put('locale', $locale);
            } else {
                $locale = Session::get('locale', $locales[0]);
            }

            App::setLocale($locale);
        }

        return $next($request);
    }
}
