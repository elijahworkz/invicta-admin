<?php

namespace Eteacher\InvictaAdmin\Events;

use Eteacher\InvictaAdmin\Admin\Models\Navigation;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NavigationError
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Navigation $menu) {}
}
