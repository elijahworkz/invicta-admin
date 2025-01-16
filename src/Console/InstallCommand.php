<?php

namespace Elijahworkz\InvictaAdmin\Console;

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

        $this->comment('Publishing Invicta Service Provider...');
        $this->callSilent('vendor:publish', ['--tag' => 'invicta-provider']);

        $this->installInvictaServiceProvider();

        $this->comment('Generating User Resource...');
        $this->callSilent('invicta:resource', ['name' => 'User']);

        $this->info('Invicta installed successfully.');
    }

    public function installInvictaServiceProvider()
    {
        $namespace = Str::replaceLast('\\', '', $this->laravel->getNamespace());

        $appConfig = file_get_contents(config_path('app.php'));

        if (Str::contains($appConfig, "{$namespace}\\Providers\\InvictaServiceProvider::class")) {
            return;
        }

        $lineEndingCount = [
            "\r\n" => substr_count($appConfig, "\r\n"),
            "\r" => substr_count($appConfig, "\r"),
            "\n" => substr_count($appConfig, "\n"),
        ];

        $eol = array_keys($lineEndingCount, max($lineEndingCount))[0];

        file_put_contents(config_path('app.php'), str_replace(
            "{$namespace}\\Providers\\EventServiceProvider::class,".$eol,
            "{$namespace}\\Providers\\EventServiceProvider::class,".$eol."        {$namespace}\Providers\InvictaServiceProvider::class,".$eol,
            $appConfig
        ));
    }
}
