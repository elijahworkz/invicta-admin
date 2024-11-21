<?php

namespace Elijahworkz\InvictaAdmin\Console;

use Illuminate\Console\Command;

class NavPublishCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invicta:nav';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish Invicta Admin navigation table';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment('Publishing Invicta Nav Migration...');
        $this->callSilent('vendor:publish', ['--tag' => 'invicta-nav']);

        $this->call('migrate');

        $this->info('Invicta successfully published migrations.');
    }
}
