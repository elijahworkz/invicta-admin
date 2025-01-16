<?php

namespace Elijahworkz\InvictaAdmin\Events;

use Elijahworkz\InvictaAdmin\Admin\Blueprints\Blueprint;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BlueprintFound
{
    use Dispatchable, SerializesModels;

    /**
     * Create new blueprint instance.
     *
     * @param  array  $blueprint
     * @param  Illuminate\Database\Eloquent\Model  $model
     */
    public function __construct(public Blueprint $blueprint, public $resource, public $model) {}
}
