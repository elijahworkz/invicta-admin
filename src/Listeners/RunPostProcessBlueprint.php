<?php

namespace Eteacher\InvictaAdmin\Listeners;

use Eteacher\InvictaAdmin\Events\BlueprintFound;

class RunPostProcessBlueprint
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
    public function handle(BlueprintFound $event)
    {
        $event->resource->postProcessBlueprint($event->blueprint);
        $event->blueprint->parseForFieldsets();
    }
}
