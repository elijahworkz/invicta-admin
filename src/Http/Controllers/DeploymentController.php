<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Aws\ElasticBeanstalk\ElasticBeanstalkClient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeploymentController extends Controller
{
    protected $client;

    protected $env;

    protected $canDeploy;

    public function __construct()
    {
        $this->env = config('app.elb_environment');
        $this->canDeploy = config('app.elb_deploy_enabled');

        $this->client = ElasticBeanstalkClient::factory([
            'region' => 'us-west-2',
            'version' => 'latest',
        ]);
    }

    public function index(Request $request)
    {
        $this->authorize('deploy site');

        return Inertia::render('Deploy/Index');
    }

    public function deploy(Request $request)
    {
        if ($this->canDeploy && $request->user()->can('deploy site')) {
            return Deploy::start($request->version);
        }

        return response(['message' => 'You are not authorized to perform this action'], 403);
    }

    public function check(Request $request)
    {
        return Deploy::cachedOutput($request->version);
    }

    public function status()
    {
        return $this->client->DescribeEnvironments([
            'EnvironmentNames' => [$this->env],
        ])['Environments'][0];
    }

    public function versions(Request $request)
    {
        return $this->client->describeApplicationVersions(['MaxRecords' => 5])['ApplicationVersions'];
    }
}
