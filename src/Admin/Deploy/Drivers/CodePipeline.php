<?php

namespace Eteacher\InvictaAdmin\Admin\Deploy\Drivers;

use Aws\CodePipeline\CodePipelineClient;
use Eteacher\InvictaAdmin\Admin\Deploy\DeployContract;
use Eteacher\InvictaAdmin\Admin\Deploy\LastDeployResource;
use Eteacher\InvictaAdmin\Admin\Models\Deployment;
use Eteacher\InvictaAdmin\Events\DeploymentFinished;

class CodePipeline implements DeployContract
{
    public function __construct()
    {
        $this->pipeline = config('invicta.deployment.codepipeline.name');
        $this->canDeploy = config('invicta.deployment.enabled');

        $this->client = CodePipelineClient::factory([
            'region' => config('invicta.deployment.codepipeline.region'),
            'version' => config('invicta.deployment.codepipeline.version'),
        ]);
    }

    public function lastDeployment(): LastDeployResource
    {
        $data = $this->client->listPipelineExecutions([
            'pipelineName' => $this->pipeline,
            'maxResults' => 1,
        ])['pipelineExecutionSummaries'][0];

        $resource = new LastDeployResource($data['pipelineExecutionId']);
        $resource->status($data['status']);
        $resource->date($data['lastUpdateTime']);
        $resource->data($data);

        return $resource;
    }

    public function start(Deployment $deployment, $version)
    {
        $result = $this->client->startPipelineExecution([
            'clientRequestToken' => $version,
            'name' => $this->pipeline,
        ]);

        $deployment->status = 'deployed';
        $deployment->data = $result;
        $deployment->save();

        DeploymentFinished::dispatch($version);
    }
}
