<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Actions;

use Eteacher\InvictaAdmin\Admin\Actions\Action;

class ImpersonateUser extends Action
{
    public $redirect = true;

    /**
     * Handle action given fields, models to operate on and user
     *
     * @param  Illuminate\Support\Fluent  $fields
     * @param  Collection  $models
     * @param  App\Models\User  $user
     * @return void
     */
    public function handle($fields, $models, $user)
    {
        $impersonated = $models->first();

        session()->put('impersonate_guard', config('invicta.auth.guard'));
        session()->put('impersonator_id', $user->getAuthIdentifier());
        session()->put('impersonated_id', $impersonated->getAuthIdentifier());

        return redirect(route('invicta.home'));
    }

    public function fields()
    {
        return [];
    }

    public function authorize($user, $model)
    {
        return $user->isDev() && $user->id !== $model->id;
    }
}
