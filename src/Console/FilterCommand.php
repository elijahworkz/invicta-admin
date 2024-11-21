<?php

namespace Elijahworkz\InvictaAdmin\Console;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class FilterCommand extends GeneratorCommand
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'invicta:filter';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new filter class';

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
    protected $type = 'Filter';

    /**
     * Execute the console command.
     *
     * @return bool|null
     */
    public function handle()
    {
        parent::handle();
    }

    /**
     * Get the stub of the class file for the generator.
     *
     * @return string
     */
    protected function getStub()
    {
        return __DIR__.'/stubs/Filter.stub.php';
    }

    /**
     * Get the default namespace for the class.
     *
     * @param  string  $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\Invicta\Filters';
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
}
