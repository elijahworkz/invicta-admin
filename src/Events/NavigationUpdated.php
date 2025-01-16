<?php

namespace Elijahworkz\InvictaAdmin\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NavigationUpdated
{
    use Dispatchable, SerializesModels;

    /**
     * Navigation menu updated.
     *
     * @param  string  $handle
     */
    public function __construct(public $handle) {}
}
