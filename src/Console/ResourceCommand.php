<?php

namespace Elijahworkz\InvictaAdmin\Console;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class ResourceCommand extends GeneratorCommand
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'invicta:resource';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new resource class';

    /**
     * Indicates whether the command should be shown in the Artisan command list.
     *
     * @var bool
     */
    // protected $hidden = true;

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Resource';

    protected $model = false;

    protected $seo = false;

    protected $resourceName = null;

    /**
     * Execute the console command.
     *
     * @return bool|null
     */
    public function handle()
    {
        parent::handle();

        $this->resourceName = $this->getNameInput();

        if ($this->resourceName !== 'User') {
            if ($this->confirm('Add model?', false)) {
                $this->model = true;
            }

            if ($this->confirm('Add seo?', false)) {
                $this->seo = true;
            }

            if ($this->model) {
                $this->call('make:model', ['name' => $this->resourceName]);
            }
        }

        $this->createBlueprint();

        if ($this->model || $this->seo) {
            $this->addMigration();
        }
    }

    /**
     * Get the stub of the class file for the generator.
     *
     * @return string
     */
    protected function getStub()
    {
        return __DIR__.'/stubs/Resource.stub.php';
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
     * Get the default namespace for the class.
     *
     * @param  string  $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\Invicta\Resources';
    }

    /**
     * Replace the class name for the given stub.
     *
     * @param  string  $stub
     * @param  string  $name
     * @return string
     */
    protected function replaceClass($stub, $name)
    {
        $class = str_replace($this->getNamespace($name).'\\', '', $name);
        $title = Str::plural($class);

        $search = ['{{ class }}', '{{ title }}', '{{ slug }}'];
        $replace = [$class, $title, strtolower($title)];

        return str_replace($search, $replace, $stub);
    }

    protected function createBlueprint()
    {
        // First we need to get the name of the class
        $name = $this->getNameInput();

        $path = $this->laravel['path'].'/Invicta/Resources/blueprints/'.$name.'.php';

        // Next, we will generate the path to the location where this file should get
        // written.
        $this->makeDirectory($path);

        $stub = $this->files->get($this->getBlueprintStub());

        $this->files->put($path, $stub);

        $this->info('Blueprint created successfully.');
    }

    protected function addMigration()
    {
        if (! $this->model && ! $this->seo) {
            return;
        }

        $namePlural = Str::plural($this->resourceName);
        $nameLower = Str::lower($namePlural);

        if ($this->model) {
            $path = $this->laravel['path.database'].'/migrations/'.date('Y_m_d_His', time()).'_create_'.$nameLower.'_table.php';

            $blueprint = __DIR__.'/../../database/migrations/invicta_resource_table.php.stub';

            $replaceModel = 'Create'.$namePlural.'Table';
        } else {
            $path = $this->laravel['path.database'].'/migrations/'.date('Y_m_d_His', time()).'_add_seo_field_to_'.$nameLower.'_table.php';

            $blueprint = __DIR__.'/../../database/migrations/invicta_update_resource_table.php.stub';

            $replaceModel = 'AddSeoFieldTo'.$namePlural.'Table';
        }

        $replaceSeo = $this->seo ? '$table->string(\'uri\')->nullable();
			$table->json(\'seo\')->nullable();' : '';

        $this->makeDirectory($path);

        $stub = $this->files->get($blueprint);

        $search = ['{{ class }}', '{{ table }}', '{{ seo }}'];
        $replace = [$replaceModel, $nameLower, $replaceSeo];

        $stub = str_replace($search, $replace, $stub);

        $this->files->put($path, $stub);

        $this->info('Migration for '.$namePlural.' created successfully');

        $this->newLine(1);

        if ($this->seo) {
            $this->info('Please add `AvailableForNavigation` trait to the current resource.');
        }
    }
}
