<?php

namespace Elijahworkz\InvictaAdmin\Listeners;

use Elijahworkz\InvictaAdmin\Events\NavigationUpdated;
use Illuminate\Support\Facades\Cache;

class ClearNavigationCache
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
    public function handle(NavigationUpdated $event)
    {
        Cache::flush();
    }
}
