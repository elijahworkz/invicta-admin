<?php

namespace Eteacher\InvictaAdmin\Providers;

use Eteacher\InvictaAdmin\Events\BlueprintFound;
use Eteacher\InvictaAdmin\Events\NavigationClearing;
use Eteacher\InvictaAdmin\Events\NavigationUpdated;
use Eteacher\InvictaAdmin\Listeners\AddSeoBlueprint;
use Eteacher\InvictaAdmin\Listeners\ClearNavigation;
use Eteacher\InvictaAdmin\Listeners\ClearNavigationCache;
use Eteacher\InvictaAdmin\Listeners\EnsureLocalizationFields;
use Eteacher\InvictaAdmin\Listeners\ProcessBlueprint;
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
        NavigationClearing::class => [
            ClearNavigation::class,
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
