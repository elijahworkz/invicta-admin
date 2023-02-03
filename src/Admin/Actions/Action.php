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
     * Action type - possible values: 'inline', 'bulk', 'global'.
     *
     * @var string
     */
    public $type = 'inline';

    /**
     * Open in modal window or in drawer.
     *
     * @var string
     */
    public $modal = true;

    /**
     * Indicates whether action should be pushed to queue.
     *
     * @var bool
     */
    public $shouldQueue = false;

    /**
     * Changes the color of the action button.
     *
     * @var bool
     */
    public $dangerous = false;

    /**
     * Changes submission button. 'false' value will hide the button
     * default value = 'Run Action'.
     *
     * @var string
     */
    public $actionButton = 'Run Action';

    /**
     * Perform the action on the given models.
     *
     * @param  Fluent  $fields available fields
     * @param  Collection  $models modelds to perform action on
     * @param  User  $user authenticated user
     * @return mixed
     */
    public function handle($fields, Collection $models, $user)
    {
        //
    }

    /**
     * Get blueprint with fields if neccessary.
     *
     * @param  ModelInstance  $item available only for inline/drawer actions
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
     * Check is action inline.
     *
     * @return bool
     */
    public function inline()
    {
        return $this->type == 'inline';
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
     * Get modal attribute for the action.
     *
     * @return bool
     */
    protected function modal()
    {
        return $this->modal;
    }

    /**
     * Get modal attribute for the action.
     *
     * @return bool
     */
    protected function type()
    {
        return $this->type;
    }

    /**
     * Get actionButton attribute for the action.
     *
     * @return bool
     */
    protected function actionButton()
    {
        return $this->actionButton;
    }

    protected function getBlueprint()
    {
        return $this->modal() ? $this->blueprint() : [];
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
            'blueprint' => $this->getBlueprint(),
            'dangerous' => $this->dangerous(),
            'action_button' => $this->actionButton(),
            'type' => $this->type(),
            'modal' => $this->modal(),
        ];
    }
}
