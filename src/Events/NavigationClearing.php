<?php

namespace Eteacher\InvictaAdmin\Events;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NavigationClearing implements ShouldQueue
{
    use Dispatchable, SerializesModels;

    public function __construct()
    {
    }
}
