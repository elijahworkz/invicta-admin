<?php

namespace Eteacher\InvictaAdmin\Http\Controllers\Auth;

use Eteacher\InvictaAdmin\Http\Controllers\Controller;
use Eteacher\InvictaAdmin\Http\Request\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Invicta.Login', [
            'loginUrl' => route('invicta.login'),
            'resetUrl' => config('invicta.auth.enable_password_reset') ? route('invicta.password.forgot') : null,
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('invicta.home'));
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(route('invicta.home'));
    }
}