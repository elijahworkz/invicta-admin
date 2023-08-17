<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Admin\Commands\CommandRegistrar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommandsController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('view commands');

        return Inertia::render('Commands/Index', [
            'commands' => CommandRegistrar::all($request->user()),
        ]);
    }

    public function run(Request $request, $handle)
    {
        $command = CommandRegistrar::get($handle);

        return $command->run($request->user());
        // $process = Process::run("sh {$script} {$this->version}")->throw();

        // $data = [
        //     'debug' => $process->exitCode(),
        //     'output' => $process->output(),
        //     'error' => $process->errorOutput(),
        // ];
        // return response()->stream(function () {
        //      Process::run('ping -c 10 google.com', function ($type, $output) {
        //         return $output;
        //      });
        //     // $proc = popen("ping -c 10 google.com", 'r');
        //     // while (! feof($proc)) {
        //     //     echo fread($proc, 4096); //"[".date("i:s")."] ".fread($proc, 4096);
        //     // }
        // }, 200, [
        //     'Cache-Control' => 'no-cache',
        //     'X-Accel-Buffering' => 'no',
        //     'Content-Type' => 'text/event-stream',
        // ]);
    }
}
