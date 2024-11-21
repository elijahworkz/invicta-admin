<?php

namespace Elijahworkz\InvictaAdmin\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class SetAuthGuard
{
    public function handle($request, Closure $next)
    {
        Auth::shouldUse(config('invicta.auth.guard', 'web'));

        if (config('invicta.auth.guard') !== 'web') {
            config(['auth.defaults.passwords' => config('invicta.auth.guard')]);
        }

        return $next($request);
    }
}
