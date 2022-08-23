<?php

namespace Eteacher\InvictaAdmin\Admin\Actions;

use Illuminate\Support\Str;
use JsonSerializable;

class Action implements JsonSerializable
{
    public $name;

    public $inline = false;

    /**
     * Get the displayable name of the action.
     *
     * @return string
     */
    protected function name()
    {
        return $this->name ?: Str::headline(Str::of($this->key())->classBasename());
    }

    /**
     * Get the key for the action.
     *
     * @return string
     */
    protected function key()
    {
        return get_class($this);
    }

    /**
     * Get inline attribute for the action.
     *
     * @return bool
     */
    protected function inline()
    {
        return $this->inline;
    }

    /**
     * Prepare the action for JSON serialization.
     *
     * @return array<string, mixed>
     */
    public function jsonSerialize(): array
    {
        return [
            'class' => $this->key(),
            'name' => $this->name(),
            'inline' => $this->inline(),
        ];
    }
}
