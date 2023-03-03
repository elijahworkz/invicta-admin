<?php

namespace Eteacher\InvictaAdmin\Admin\Deploy;

use Eteacher\InvictaAdmin\Admin\Models\Deployment;

interface DeployContract
{
    public function lastDeployment(): LastDeployResource;

    public function start(Deployment $deployment, string $version);
}
