<?php

namespace Elijahworkz\InvictaAdmin\Console;

use Illuminate\Console\Command;

class GlobalSettingPublishCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invicta:globals {--only-seo}';

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
        // this option skip global settings publish
        $seo = $this->option('only-seo');

        if (! $seo) {
            $this->comment('Publishing Invicta Global Settings Migration...');

            $this->callSilent('vendor:publish', ['--tag' => 'invicta-global']);

            $this->call('migrate');

            $this->info('Invicta successfully published migrations.');

            $this->makeBlueprintsDirectory();

            $this->createBlueprint();
        }

        //add seo blueprints and seeder
        if ($seo || $this->confirm('Do you want to add seo?', true)) {
            $this->callSilent('vendor:publish', ['--tag' => 'invicta-sitemap']);

            $this->createSeoBlueprint();

            $this->createSeoBlueprint(true);

            if ($this->confirm('Do you want to add seo global setting seeder?', true)) {
                $this->callSilent('vendor:publish', ['--tag' => 'invicta-global-seo']);

                $this->call('db:seed', [
                    '--class' => 'Database\Seeders\GlobalSettingSeeder',
                ]);

                $this->info('Invicta successfully published seeder.');
            }
        }
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
     * Get the stub of the blueprint file for the generator.
     *
     * @return string
     */
    protected function getSeoBlueprintStub($fieldset = false)
    {
        if ($fieldset) {
            return __DIR__.'/stubs/seo_blueprint/fieldset.stub.php';
        }

        return __DIR__.'/stubs/seo_blueprint/global_settings.stub.php';
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

        $blueprint = $this->getBlueprintStub();

        $this->makeDirectory($path);

        $stub = $this->laravel['files']->get($blueprint);

        $this->laravel['files']->put($path, $stub);

        $this->info('Default blueprint created successfully.');
    }

    /**
     * Cretae seo GlobalSetting blueprint and fieldset.
     */
    protected function createSeoBlueprint($fieldset = false)
    {
        if ($fieldset) {
            $path = $this->laravel['path.resources'].'/fieldsets/seo.php';
            $blueprint = $this->getSeoBlueprintStub(true);
        } else {
            $path = $this->laravel['path.resources'].'/blueprints/global_settings/seo.php';
            $blueprint = $this->getSeoBlueprintStub();
        }

        $this->makeDirectory($path);

        $stub = $this->laravel['files']->get($blueprint);

        $this->laravel['files']->put($path, $stub);

        $this->info(($fieldset ? 'Seo fieldset' : 'Seo global setting').' blueprint created successfully.');
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
