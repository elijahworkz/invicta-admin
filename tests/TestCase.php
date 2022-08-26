<?php

namespace Eteacher\InvictaAdmin\Tests;

use Eteacher\InvictaAdmin\InvictaServiceProvider;
use Eteacher\InvictaAdmin\Providers\InvictaBaseServiceProvider;
use Inertia\Inertia;
use Inertia\ServiceProvider as InertiaServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;

class TestCase extends Orchestra
{
    protected function setUp(): void
    {
        parent::setUp();

        Inertia::setRootView('app');
        config()->set('inertia.page.should_exist', false);
        //		config()->set('inertia.page.paths', [realpath(__DIR__) . '/../resources/js/views']);
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
//        dd(config('app.aliases'));
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
}
