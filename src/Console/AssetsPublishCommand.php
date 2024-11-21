<?php

namespace Elijahworkz\InvictaAdmin\Console;

use Illuminate\Console\Command;

class AssetsPublishCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invicta:assets';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish Invicta Admin assets table';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment('Publishing Invicta Assets Migration...');
        $this->callSilent('vendor:publish', ['--tag' => 'invicta-assets']);

        $this->call('migrate');

        $this->info('Invicta successfully published migrations.');
    }
}
