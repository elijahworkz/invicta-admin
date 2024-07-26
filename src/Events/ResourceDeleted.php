<?php

namespace Eteacher\InvictaAdmin\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ResourceDeleted
{
    use Dispatchable, SerializesModels;

    /**
     * Navigation menu updated.
     *
     * @param  string  $handle
     */
    public function __construct(public $handle, public $item) {}
}
