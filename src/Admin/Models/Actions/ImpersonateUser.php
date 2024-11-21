<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models\Actions;

use Elijahworkz\InvictaAdmin\Admin\Actions\Action;
use Illuminate\Database\Eloquent\Collection;

class ImpersonateUser extends Action
{
    public $redirect = true;

    /**
     * Handle action given fields, models to operate on and user
     *
     * @param  \Illuminate\Support\Fluent  $fields
     * @param  \App\Models\User  $user
     * @return void
     */
    public function handle($fields, Collection $models, $user)
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
