<?php

namespace Eteacher\InvictaAdmin;

use Illuminate\Support\ServiceProvider;

class InvictaServiceProvider extends ServiceProvider
{
    /**
     *  Register needed services.
     *
     *  @return void
     */
    public function register()
    {
        $this->commands([
            Console\InstallCommand::class,
        ]);
    }
}
