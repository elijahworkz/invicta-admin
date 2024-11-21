<?php

namespace Elijahworkz\InvictaAdmin\Console;

use Illuminate\Console\Command;

class PublishCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invicta:publish';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish Invicta Admin public resources';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment('Publishing Invicta Assets...');
        $this->callSilent('vendor:publish', ['--tag' => 'public-assets', '--force' => true]);
        $this->info('Invicta successfully published assets.');
    }
}
