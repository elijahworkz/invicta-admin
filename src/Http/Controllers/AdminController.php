<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function home()
    {
        return Inertia::render('Invicta.Home', []);
    }

    public function impersonateLeave()
    {
        if (! $user = \App\Models\User::find(session('impersonator_id'))) {
            return false;
        }

        Auth::loginUsingId($user->getAuthIdentifier());

        session()->forget('impersonator_id');
        session()->forget('impersonated_id');

        return redirect(route('invicta.home'));
    }
}
