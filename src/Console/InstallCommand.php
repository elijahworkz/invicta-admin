<?php

namespace Eteacher\InvictaAdmin\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class InstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invicta:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install all of the Invicta Admin resources';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment('Publishing Invicta Assets and Resources...');
        $this->callSilent('vendor:publish', ['--tag' => 'invicta-config']);

        $this->comment('Publishing Invicta Service Provider...'); // not sure if it's needed - depends on what we need to do from app side
        $this->callSilent('vendor:publish', ['--tag' => 'invicta-provider']);

        $this->installInvictaServiceProvider();

        $this->comment('Generating User Resources...');
        /*
            this should generate all the user related stuff in new folder

        */
    }

    public function installInvictaServiceProvider()
    {
        $namespace = Str::replaceLast('\\', '', $this->laravel->getNamespace());

        if (! Str::contains($appConfig = file_get_contents(config_path('app.php')), "{$namespace}\\Providers\\InvictaServiceProvider::class")) {
            file_put_contents(config_path('app.php'), str_replace(
                "{$namespace}\\Providers\\EventServiceProvider::class,".PHP_EOL,
                "{$namespace}\\Providers\\EventServiceProvider::class,".PHP_EOL."        {$namespace}\Providers\InvictaServiceProvider::class,".PHP_EOL,
                $appConfig
            ));
        }
    }
}
