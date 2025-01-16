<?php

namespace Elijahworkz\InvictaAdmin\Events;

use Elijahworkz\InvictaAdmin\Admin\Models\Navigation;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NavigationError
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Navigation $menu) {}
}
