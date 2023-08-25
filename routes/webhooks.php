<?php

if (config('invicta.deployment.driver') == 'codepipeline') {
    Route::post('codepipeline', [DeploymentController::class, 'processWebhook']);
}
