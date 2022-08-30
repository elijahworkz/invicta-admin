<?php

namespace Eteacher\InvictaAdmin\Console;

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
    protected $description = 'Add user to Super Admins group by their ID';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $user = app(invicta_user_model())::firstOrNew([
            'email' => 'dev@eteachergroup.com',
        ]);

        $user->password = 'password';
        $user->name = 'Dev User';
        $user->save();
        $user->addToGroup(1);

        $this->info('Dev user was added to Super Admins group.');
    }
}
