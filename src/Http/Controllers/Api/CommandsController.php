<?php

namespace Eteacher\InvictaAdmin\Http\Controllers\Api;

use Eteacher\InvictaAdmin\Admin\Commands\CommandRegistrar;
use Eteacher\InvictaAdmin\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommandsController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('view commands');

        return [
            'commands' => CommandRegistrar::all($request->user()),
        ];
    }

    public function run(Request $request, $handle)
    {
        $command = CommandRegistrar::get($handle);

        return $command->run($request->user());
    }
}
