<?php

namespace Eteacher\InvictaAdmin\Console;

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

    /**
     * Execute the console command.
     *
     * @return bool|null
     */
    public function handle()
    {
        parent::handle();

        $this->createBlueprint();
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
     * Get the stub of the json file for the generator.
     *
     * @return string
     */
    protected function getJsonStub()
    {
        return __DIR__.'/stubs/blueprint.stub.json';
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

        $path = $this->laravel['path'].'/Invicta/Resources/blueprints/'.$name.'.json';

        // Next, we will generate the path to the location where this file should get
        // written.
        $this->makeDirectory($path);

        $stub = $this->files->get($this->getJsonStub());

        $this->files->put($path, $stub);

        $this->info('Blueprint created successfully.');
    }
}
