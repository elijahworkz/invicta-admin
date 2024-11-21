<?php

namespace Elijahworkz\InvictaAdmin\Console;

use Illuminate\Console\Command;

class AuthPublishCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invicta:auth';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish Invicta Admin authorization tables';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment('Publishing Invicta Auth Migrations...');

        $this->callSilent('vendor:publish', ['--tag' => 'invicta-auth']);

        $this->info('Invicta successfully published migrations.');

        $this->newLine(1);

        $this->info('Review published migration file and run `php artisan migrate`.');

        $this->newLine(1);

        $this->info('Please add `IsInvictaUser` trait to your User model.');

        $this->newLine(1);

        $this->info('Add `last_login` and `dev` fields to fillable array in User model.');
    }
}
