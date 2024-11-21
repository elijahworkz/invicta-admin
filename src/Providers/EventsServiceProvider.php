<?php

namespace Elijahworkz\InvictaAdmin\Providers;

use Elijahworkz\InvictaAdmin\Events\BlueprintFound;
use Elijahworkz\InvictaAdmin\Events\NavigationError;
use Elijahworkz\InvictaAdmin\Events\NavigationUpdated;
use Elijahworkz\InvictaAdmin\Listeners\AddSeoBlueprint;
use Elijahworkz\InvictaAdmin\Listeners\ClearNavigationCache;
use Elijahworkz\InvictaAdmin\Listeners\EnsureLocalizationFields;
use Elijahworkz\InvictaAdmin\Listeners\HandleNavigationError;
use Elijahworkz\InvictaAdmin\Listeners\ProcessBlueprint;
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
            AddSeoBlueprint::class,
            ProcessBlueprint::class,
        ],
        NavigationUpdated::class => [
            ClearNavigationCache::class,
        ],
        NavigationError::class => [
            HandleNavigationError::class,
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
