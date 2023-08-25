<?php

namespace Eteacher\InvictaAdmin\Admin\Deploy\Drivers;

use Aws\CodePipeline\CodePipelineClient;
use Aws\Sns\Message;
use Aws\Sns\MessageValidator;
use Eteacher\InvictaAdmin\Admin\Deploy\DeployContract;
use Eteacher\InvictaAdmin\Admin\Deploy\LastDeployResource;
use Eteacher\InvictaAdmin\Admin\Models\Deployment;
use Eteacher\InvictaAdmin\Events\DeploymentFinished;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CodePipeline implements DeployContract
{
    protected $client;

    protected $pipeline;

    protected $canDeploy;

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
        if ($this->canDeploy) {
            $result = $this->client->startPipelineExecution([
                'clientRequestToken' => $version,
                'name' => $this->pipeline,
            ]);

            $test = json_decode($result);

            $deployment->version = $result['pipelineExecutionId'];
            $deployment->save();

            // DeploymentFinished::dispatch($version);
        }
    }

    public function processWebhook(Request $request)
    {
        try {
            // Retrieve the message
            $message = Message::fromRawPostData();

            // make validator instance
            $validator = new MessageValidator();

            // Validate the message
            if ($validator->isValid($message)) {
                if ($message['Type'] == 'SubscriptionConfirmation') {
                    // if it's subscription or unsubscribe event then call SubscribeURL
                    $subscribe = file_get_contents($message['SubscribeURL']);
                    Log::info('Subscription Request from SNS', [$subscribe]);
                } elseif ($message['Type'] === 'Notification') {
                    $subject = $message['Subject'];
                    $messageData = json_decode($message['Message']);

                    // use $subject and $messageData and take relevant action
                    Log::info('Request from SNS', [
                        'subject' => $subject,
                        'messageData' => $messageData,
                    ]);

                    $executionId = $messageData['detail']['execution-id'] ?? null;
                    $state = $messageData['detail']['state'] ?? false;

                    if ($executionId && $state) {
                        $deployment = Deployment::where('version', $executionId)->first();
                        $deployment->status = $state;
                        $deployment->data = $messageData;
                        $deployment->save();

                        if ($state == 'SUCCEEDED') {
                            DeploymentFinished::dispatch($executionId);
                        }
                    }
                }
            }
        } catch (Exception $e) {
            // Handle exception
        }
    }
}
