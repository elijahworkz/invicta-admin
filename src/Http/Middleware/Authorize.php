<?php

namespace Eteacher\InvictaAdmin\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;
use Inertia\Inertia;

class Authorize
{
    public function handle($request, Closure $next)
    {
        if (! $user = $request->user()) {
            $route = config('invicta.auth.enable_login_form') ? route('invicta.login') : route('login');

            if ($request->inertia()) {
                return Inertia::location($route);
            }
            // throw new AuthenticationException('Unauthenticated.', [], $route);
        }

        return $next($request);
    }
}
