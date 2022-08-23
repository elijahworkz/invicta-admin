<?php

namespace Eteacher\InvictaAdmin\Admin\Actions;

use Illuminate\Support\Str;
use JsonSerializable;

class Action implements JsonSerializable
{
    public $name;

    public $inline = false;

    public $dangerous = false;

    public $shouldQueue = false;

    /**
     * Perform action on the given models.
     *
     * @return mixed
     */
    public function handle($fields, $models)
    {
        // code...
    }

    /**
     * Get blueprint with fields if neccessary.
     *
     * @return array
     */
    public function fields()
    {
        return [];
    }

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
     * Get dangerous attribute for the action.
     *
     * @return bool
     */
    protected function dangerous()
    {
        return $this->dangerous;
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
            'fields' => $this->fields(),
            'inline' => $this->inline(),
            'dangerous' => $this->dangerous(),
        ];
    }
}
