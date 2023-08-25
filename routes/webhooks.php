<?php

use Eteacher\InvictaAdmin\Http\Controllers\DeploymentController;

if (config('invicta.deployment.driver') == 'codepipeline') {
    Route::post('codepipeline', [DeploymentController::class, 'processWebhook']);
}
