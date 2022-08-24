<?php

namespace App\Providers;

use Eteacher\InvictaAdmin\Facades\Menu;
use Eteacher\InvictaAdmin\Admin\Models\Resources\Group;
use Eteacher\InvictaAdmin\Providers\InvictaBaseServiceProvider;

class InvictaServiceProvider extends InvictaBaseServiceProvider
{
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
