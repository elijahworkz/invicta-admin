<?php

namespace Eteacher\InvictaAdmin\Admin\Actions;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;
use JsonSerializable;

class Action implements JsonSerializable
{
    /**
     * Overwrite the name of the action for display.
     *
     * @var bool
     */
    public $name;

    /**
     * Bulk or single model action if set to true.
     *
     * @var bool
     */
    public $inline = false;

    /**
     * Changes the color of the action button.
     *
     * @var bool
     */
    public $dangerous = false;

    /**
     * Indicates whether action should be pushed to queue.
     *
     * @var bool
     */
    public $shouldQueue = false;

    /**
     * Action type - possible values: 'modal', 'drawer'.
     *
     * @var string
     */
    public $type = 'modal';

    /**
     * Perform the action on the given models.
     * @param  Fluent     $fields available fields
     * @param  Collection $models modelds to perform action on
     * @param  User       $user authenticated user
     * @return mixed
     */
    public function handle($fields, Collection $models, $user)
    {
        // code...
    }

    /**
     * Get blueprint with fields if neccessary.
     *
     * @param ModelInstance $item available only for inline/drawer actions
     * @return array
     */
    public function blueprint($item = null)
    {
        return [];
    }

    /**
     * Get the displayable name of the action.
     *
     * @return string
     */
    public function name()
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
     * Get type attribute for the action.
     *
     * @return bool
     */
    protected function type()
    {
        return $this->type;
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
            'blueprint' => $this->type == 'drawer' ? [] : $this->blueprint(),
            'dangerous' => $this->dangerous(),
            'type' => $this->type(),
        ];
    }
}
