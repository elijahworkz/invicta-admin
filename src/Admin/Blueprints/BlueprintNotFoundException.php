<?php

namespace Eteacher\LaravelSiteKit\Admin\Blueprints;

use Exception;

class BlueprintNotFoundException extends Exception
{
    public function __construct(public $blueprint) {}

    /**
     * Get the exception's context information.
     *
     * @return array<string, mixed>
     */
    public function context(): array
    {
        return ['blueprint' => $this->blueprint];
    }
}
