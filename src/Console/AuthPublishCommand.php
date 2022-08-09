<?php

namespace Eteacher\InvictaAdmin\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class AuthPublishCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invicta:auth {--group-only}';

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
        $groupOnly = $this->option('group-only');

        if ($groupOnly) {
            $this->comment('Creating super admin group');
            $this->createSuperAdminGroup();
            $this->info('Super admin group created.');
        } else {
            $this->comment('Publishing Invicta Auth Migrations...');
            $this->callSilent('vendor:publish', ['--tag' => 'invicta-auth']);

            $this->call('migrate');

            $this->createSuperAdminGroup();

            $this->info('Invicta successfully published migrations.');
            $this->newLine(1);
            $this->info('Please add `IsInvictaUser` trait to your User model.');
        }
    }

    protected function createSuperAdminGroup()
    {
        $groupTable = config('invicta.auth_tables.groups');

        DB::table($groupTable)->insert([
            'name' => 'super_admin',
            'title' => 'Super Admins',
            'is_super' => true,
        ]);
    }
}
