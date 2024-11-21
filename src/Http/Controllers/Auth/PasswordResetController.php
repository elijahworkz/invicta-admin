<?php

namespace Elijahworkz\InvictaAdmin\Http\Controllers\Auth;

use Elijahworkz\InvictaAdmin\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class PasswordResetController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return view('invicta::auth.forgot-password', [
            'actionUrl' => route('invicta.password.email'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('message', strip_tags(__($status, ['email' => $request->email]), 'span'));
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
