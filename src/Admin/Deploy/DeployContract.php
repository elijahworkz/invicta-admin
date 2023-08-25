<?php

namespace Eteacher\InvictaAdmin\Admin\Deploy;

use Eteacher\InvictaAdmin\Admin\Models\Deployment;
use Illuminate\Http\Request;

interface DeployContract
{
    public function lastDeployment(): LastDeployResource;

    public function start(Deployment $deployment, string $version);

    public function processWebhook(Request $request);
}
