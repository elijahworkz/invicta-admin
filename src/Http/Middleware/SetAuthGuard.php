<?php

namespace Eteacher\InvictaAdmin\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class SetAuthGuard
{
    public function handle($request, Closure $next)
    {
        Auth::shouldUse(config('invicta.auth.guard', 'web'));

        return $next($request);
    }
}
