<?php

namespace Elijahworkz\InvictaAdmin\Console;

use Illuminate\Console\Command;

class MakeSuperAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invicta:make-admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add Dev admin';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $user = app(invicta_user_model())::firstOrNew([
            'email' => 'dev@elijahworkz.com',
        ]);

        $user->password = 'password';
        $user->name = 'Dev User';
        $user->dev = true;
        $user->save();

        $this->info('Dev user  with email:`dev@elijahworkz.com` password:`password` was added');
    }
}
