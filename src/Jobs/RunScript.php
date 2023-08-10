<?php

namespace Eteacher\InvictaAdmin\Jobs;

use Eteacher\InvictaAdmin\Events\DeploymentFinished;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Process;

class RunScript implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(public $script, public $options)
    {
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $process = Process::run("sh {$this->script} {$this->options}", function ($type, $output) {
            // return
        })->throw();

        $data = [
            'debug' => $process->exitCode(),
            'output' => $process->output(),
            'error' => $process->errorOutput(),
        ];

        $this->deployment->status = $process->successful() ? 'deployed' : 'error';
        $this->deployment->data = $data;
        $this->deployment->save();

        DeploymentFinished::dispatch($this->deployment->version);
        // do we do something here? broadcast message?!
    }
}
