<?php

namespace Eteacher\InvictaAdmin\Console;

use Illuminate\Console\Command;

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
        /*
    	1. create needed folders
    	2. add InvictaServerProvider
    	3.
    	 */

        $this->comment('Publishing Invicta Assets and Resources...');

        $this->comment('Publishing Invicta Service Provider...'); // not sure if it's needed - depends on what we need to do from app side

        $this->comment('Generating User Resources...');
        /*
            this should generate all the user related stuff in new folder

        */
    }
}
