<?php

namespace Elijahworkz\InvictaAdmin\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;

class Authorize
{
    public function handle($request, Closure $next)
    {
        if (! $user = $request->user()) {
            $route = config('invicta.auth.enable_login_form') ? 'invicta.login' : 'login';

            return redirect()->route($route);
            // throw new AuthenticationException('Unauthenticated.', [], $route);
        }

        return $next($request);
    }
}
