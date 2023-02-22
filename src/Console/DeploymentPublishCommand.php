<?php

namespace Eteacher\InvictaAdmin\Console;

use Illuminate\Console\Command;

class DeploymentPublishCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invicta:deploy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish Invicta Admin deployment table';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment('Publishing Invicta Deployment Migration...');
        $this->callSilent('vendor:publish', ['--tag' => 'invicta-deploy']);

        $this->call('migrate');

        $this->info('Invicta successfully published migrations.');
    }
}
