<?php

namespace Eteacher\InvictaAdmin\Admin\Actions;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ActionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $action;

    public $models;

    public $fields;

    public function __construct(Action $action, Collection $models, $fields)
    {
        $this->action = $action;
        $this->models = $models;
        $this->fields = $fields;
    }

    public function handle()
    {
        $this->action->handle($this->fields, $this->models);
    }
}
