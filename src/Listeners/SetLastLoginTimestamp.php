<?php

namespace Elijahworkz\InvictaAdmin\Listeners;

use Illuminate\Auth\Events\Login;

class SetLastLoginTimestamp
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(Login $event)
    {
        $user = $event->user;

        $user->last_login = now();
        $user->save();
    }
}
