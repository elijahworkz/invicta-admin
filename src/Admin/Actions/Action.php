<?php

namespace Eteacher\InvictaAdmin\Admin\Actions;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;
use JsonSerializable;

class Action implements JsonSerializable
{
    public $name;

    public $inline = false;

    public $dangerous = false;

    public $shouldQueue = false;

    /**
     * Perform the action on the given models
     * @param  Fluent     $fields available fields
     * @param  Collection $models modelds to perform action on
     * @return mixed
     */
    public function handle($fields, Collection $models)
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
     * Authorize action for given user and model.
     */
    public function authorize($user, $model)
    {
        return true;
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
