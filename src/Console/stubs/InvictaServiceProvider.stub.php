<?php

namespace App\Providers;

use Elijahworkz\InvictaAdmin\Admin\Models\Resources\Group;
use Elijahworkz\InvictaAdmin\Facades\Menu;
use Elijahworkz\InvictaAdmin\Providers\InvictaBaseServiceProvider;

class InvictaServiceProvider extends InvictaBaseServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [];

    /**
     * Bootstrap any package services.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        $this->registerAssets();
        $this->registerMenu();
    }

    /**
     * Register needed services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    protected function registerAssets()
    {
        // code...
    }

    protected function registerMenu()
    {
        // Menu::resource(User::class)->group('Admin');
        Menu::resource(Group::class);
        Menu::permissions();
    }
}
