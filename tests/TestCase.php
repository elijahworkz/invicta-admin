<?php

namespace Eteacher\InvictaAdmin\Tests;

use Eteacher\InvictaAdmin\Admin\Models\Group;
use Eteacher\InvictaAdmin\InvictaServiceProvider;
use Eteacher\InvictaAdmin\Providers\InvictaBaseServiceProvider;
use Eteacher\InvictaAdmin\Tests\Models\User;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\ServiceProvider as InertiaServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;

class TestCase extends Orchestra
{
    protected function setUp(): void
    {
        parent::setUp();

        Inertia::setRootView('app');
        config()->set('inertia.testing.ensure_pages_exist', false);
        config()->set('inertia.testing.page_paths', [realpath(__DIR__).'/../resources/js/views']);
    }

    protected function getPackageProviders($app)
    {
        return [
            InvictaBaseServiceProvider::class,
            InvictaServiceProvider::class,
            InertiaServiceProvider::class,
        ];
    }

    protected function getPackageAliases($app)
    {
        return [
            'InvictaAdmin' => 'Eteacher\InvictaAdmin\InvictaAdmin',
        ];
    }

    protected function getEnvironmentSetUp($app)
    {
        $app['config']->set('app.key', 'AckfSECXIvnK5r28GVIWUAxmbBSjTsmF');

        // Setup default database to use sqlite :memory:
        $app['config']->set('database.default', 'testbench');
        $app['config']->set(
            'database.connections.testbench',
            [
                'driver' => 'sqlite',
                'database' => ':memory:',
                'prefix' => '',
            ]
        );
    }

    protected function defineDatabaseMigrations()
    {
        $this->runLaravelMigrations(
            [
                '--database' => 'testbench',
                '--path' => 'migrations/../../../../../tests/database/migrations',
            ]
        );
    }

    public function getUser($super = false)
    {
        $user = User::factory()->create();

        if ($super) {
            $superGroup = $this->createGroupWithAbilities();

            $user->groups()->sync($superGroup->id);
        }

        return $user;
    }

    public function createGroupWithAbilities($abilities = null, $name = 'test')
    {
        $super = $abilities ? 0 : 1;
        $group = new Group();
        $group->name = $super ? 'super' : $name;
        $group->title = $super ? 'Super' : $name;
        $group->is_super = $super;
        $group->save();

        if ($abilities) {
            $permisssions = Arr::map($abilities, function ($value) {
                return ['ability' => $value];
            });

            $group->permissions()->delete();
            $group->permissions()->createMany($permisssions);
        }

        return $group;
    }
}
