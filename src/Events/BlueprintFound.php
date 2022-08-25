<?php

namespace Eteacher\InvictaAdmin\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BlueprintFound
{
    use Dispatchable, SerializesModels;

    /**
     * Create new blueprint instance.
     *
     * @param array $blueprint
     * @param Illuminate\Database\Eloquent\Model $model
     */
    public function __construct(public $blueprint, public $model)
    {
    }
}
