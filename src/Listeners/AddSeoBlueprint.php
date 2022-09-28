<?php

namespace Eteacher\InvictaAdmin\Listeners;

use Eteacher\InvictaAdmin\Events\BlueprintFound;

class AddSeoBlueprint
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
        if (method_exists($event->resource, 'navTitle')) {
            $event->blueprint->addSection($event->resource->getSeoSectionBlueprint());
        }
    }
}
