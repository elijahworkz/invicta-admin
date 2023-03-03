<?php

namespace Eteacher\InvictaAdmin\Admin\Deploy\Drivers;

use Aws\ElasticBeanstalk\ElasticBeanstalkClient;
use Eteacher\InvictaAdmin\Admin\Deploy\DeployContract;
use Eteacher\InvictaAdmin\Admin\Deploy\LastDeployResource;
use Eteacher\InvictaAdmin\Admin\Models\Deployment;
use Eteacher\InvictaAdmin\Jobs\RunDeploymentScript;

class ElasticBeanstalk implements DeployContract
{
    public function __construct()
    {
        $this->env = config('invicta.deployment.elb.environment');
        $this->canDeploy = config('invicta.deployment.enabled');

        $this->client = ElasticBeanstalkClient::factory([
            'region' => config('invicta.deployment.elb.region'),
            'version' => config('invicta.deployment.elb.version'),
        ]);
    }

    public function lastDeployment(): LastDeployResource
    {
        $data = $this->client->DescribeEnvironments([
            'EnvironmentNames' => [$this->env],
        ])['Environments'][0];

        // dd($data);

        $resource = new LastDeployResource($data['VersionLabel']);
        $resource->status($data['Status']);
        $resource->health($data['HealthStatus']);
        $resource->date($data['DateUpdated']);
        $resource->data($data);

        return $resource;
    }

    public function start(Deployment $deployment, $version)
    {
        RunDeploymentScript::dispatch($deployment, $version);
    }
}
