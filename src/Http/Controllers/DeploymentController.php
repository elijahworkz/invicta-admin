<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Models\Deployment;
use Eteacher\InvictaAdmin\Facades\Deploy;
use Eteacher\InvictaAdmin\Http\Resources\DeploymentResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DeploymentController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('deploy site');

        $perPage = $request->query('per_page', 10);
        $sortBy = $request->query('sort_by', 'id');
        $sortOrder = $request->query('sort_order', 'desc');

        $deployments = Deployment::with('user')
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage);

        return Inertia::render('Deploy/Index', [
            'canDeploy' => config('invicta.deployment.enabled'),
            'deployments' => DeploymentResource::collection($deployments),
            'columns' => [
                'id' => Column::id()->sortable(),
                'version' => Column::make('Version'),
                'user' => Column::make('Deployed by'),
                'status' => Column::make('Status'),
                'created' => Column::make('Deployed on'),
            ],
        ]);
    }

    public function details(Request $request, Deployment $deployment)
    {
        return $deployment->data;
    }

    public function deploy(Request $request)
    {
        $request->validate([
            'version' => 'required|string',
        ]);

        $deployment = Deployment::create([
            'version' => $request->version,
            'user_id' => $request->user()->id,
            'status' => 'deploying...',
        ]);

        Deploy::start($deployment, $request->version);

        Redirect::back()->with('message', [
            'type' => 'success',
            'title' => 'Deployment job queued',
        ]);
    }

    public function lastDeployment()
    {
        return Deploy::lastDeployment();
    }

    public function processWebhook(Request $request)
    {
        return Deploy::processWebhook($request);
    }

    public function destroy(Request $request)
    {
        $this->authorize('deploy site');

        Deployment::whereIn('id', $request->selected)->delete();

        return Redirect::back()->with('message', [
            'type' => 'success',
            'title' => 'Selected deployment deleted',
        ]);
    }
}
