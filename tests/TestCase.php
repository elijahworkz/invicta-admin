<?php

namespace Eteacher\InvictaAdmin\Tests;

use Eteacher\InvictaAdmin\InvictaServiceProvider;
use Eteacher\InvictaAdmin\Providers\InvictaBaseServiceProvider;

class TestCase extends \Orchestra\Testbench\TestCase
{
    protected function getPackageProviders($app)
    {
        return [
            InvictaBaseServiceProvider::class,
            InvictaServiceProvider::class,
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
        $this->loadLaravelMigrations(
            [
                '--database' => 'testbench',
                '--path' => realpath(__DIR__.'/../tests/database/migrations'),
            ]
        );
    }
}
