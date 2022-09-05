<?php

namespace Eteacher\InvictaAdmin\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Impersonate
{
    public function handle($request, Closure $next)
    {
        if (Auth::check() && (method_exists(Auth::user(), 'isSuper') && Auth::user()->isSuper()) && session()->has('impersonated_id')) {
            Auth::onceUsingId(session('impersonated_id'));
        }

        return $next($request);
    }
}
