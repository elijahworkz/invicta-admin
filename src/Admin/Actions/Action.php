<?php

namespace Elijahworkz\InvictaAdmin\Admin\Actions;

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
     * sent api request if redirect = false.
     * make http link if redirect = true
     *
     * @var string
     */
    public $redirect = false;

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

    protected $item;

    /**
     * Handle action given fields, models to operate on and user
     *
     * @param  \Illuminate\Support\Fluent  $fields
     * @param  \App\Models\User  $user
     * @return void
     */
    public function handle($fields, Collection $models, $user)
    {
        //
    }

    /**
     * Perform action on a single item
     *
     * @param  $item  Single model or a model object
     */
    public function run($item)
    {
        // code...
    }

    /**
     * Get blueprint with fields if neccessary.
     *
     * @param  ModelInstance  $item  available only for inline/drawer actions
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

    public function setRedirect($resource)
    {
        $this->redirect = route('invicta.resource.handle-redirect-actions', ['resource' => $resource]);
    }

    /**
     * Get redirect attribute for the action.
     *
     * @return bool
     */
    protected function redirect()
    {
        return $this->redirect;
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
     * @return bool | string
     */
    protected function actionButton()
    {
        return $this->actionButton;
    }

    protected function getBlueprint()
    {
        $blueprint = $this->blueprint($this->item);

        return ! empty($blueprint) ? $blueprint : null;
    }

    public function setItem($item)
    {
        $this->item = $item;
    }

    /**
     * Set action response
     */
    public function message()
    {
        $title = $this->shouldQueue ? 'Action was added to the queue' : 'Action run successfully';

        return [
            'message' => [
                'type' => 'success',
                'title' => $title,
            ],
        ];
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
            'redirect' => $this->redirect(),
        ];
    }
}
