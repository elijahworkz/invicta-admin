<?php

namespace Elijahworkz\InvictaAdmin\Console;

use Illuminate\Console\Command;

class TwoFactorAuthenticationCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invicta:2fa';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Enable Two-factor authentication for Invicta Admin';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment('Publishing Invicta 2FA Migration...');

        $this->callSilent('vendor:publish', ['--tag' => 'invicta-2fa']);

        $this->info('Invicta successfully published migration.');

        $this->newLine(1);

        $this->info('Review published migration file and run `php artisan migrate` to update users table.');
    }
}
