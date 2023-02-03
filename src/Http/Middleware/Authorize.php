<?php

namespace Eteacher\InvictaAdmin\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;

class Authorize
{
    public function handle($request, Closure $next)
    {
        if (! $user = $request->user()) {
            $route = config('invicta.auth.enable_login_form') ? route('invicta.login') : route('login');
            throw new AuthenticationException('Unauthenticated.', [], $route);
        }

        return $next($request);
    }
}
