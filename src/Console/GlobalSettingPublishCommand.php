<?php

namespace Eteacher\InvictaAdmin\Console;

use Illuminate\Console\Command;

class GlobalSettingPublishCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invicta:globals';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish Invicta Admin global settings table';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment('Publishing Invicta Global Settings Migration...');

        $this->callSilent('vendor:publish', ['--tag' => 'invicta-global']);

        $this->call('migrate');

        $this->info('Invicta successfully published migrations.');

        $this->makeBlueprintsDirectory();

        $this->createBlueprint();
    }

    /**
     * Get the stub of the blueprint file for the generator.
     *
     * @return string
     */
    protected function getBlueprintStub()
    {
        return __DIR__.'/stubs/blueprint.stub.php';
    }

    /**
     * create global_settings directory in resources.
     */
    public function makeBlueprintsDirectory()
    {
        $path = $this->laravel['path.resources'].'/blueprints/global_settings/default.php';

        // May be create blueprints directory if it doesn't exist yet
        $this->makeDirectory(dirname($path));

        // Create parent directory for custom blueprints
        $this->makeDirectory($path);

        $this->info('Blueprints directory created successfully.');
    }

    /**
     * Cretae default GlobalSetting blueprint.
     */
    protected function createBlueprint()
    {
        $path = $this->laravel['path'].'/Invicta/Resources/blueprints/GlobalSetting.php';

        $this->makeDirectory($path);

        $stub = $this->laravel['files']->get($this->getBlueprintStub());

        $this->laravel['files']->put($path, $stub);

        $this->info('Default blueprint created successfully.');
    }

    /**
     * Build the directory for the class if necessary.
     *
     * @param  string  $path
     * @return string
     */
    protected function makeDirectory($path)
    {
        if (! $this->laravel['files']->isDirectory(dirname($path))) {
            $this->laravel['files']->makeDirectory(dirname($path), 0777, true, true);
        }

        return $path;
    }
}