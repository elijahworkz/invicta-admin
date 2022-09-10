<?php

namespace Eteacher\InvictaAdmin\Providers;

use Eteacher\InvictaAdmin\Events\BlueprintFound;
use Eteacher\InvictaAdmin\Listeners\EnsureLocalizationFields;
use Eteacher\InvictaAdmin\Listeners\RunPostProcessBlueprint;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventsServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        BlueprintFound::class => [
            EnsureLocalizationFields::class,
            RunPostProcessBlueprint::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }
}
