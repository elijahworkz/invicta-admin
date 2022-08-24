<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Actions;

use Eteacher\InvictaAdmin\Admin\Actions\Action;
use Illuminate\Support\Facades\Auth;

class ImpersonateUser extends Action
{
    public $inline = true;

    public function handle($fields, $models)
    {
        redirect(route('invicta.home'));
        $user = $models->first();

        session()->put('impersonator_id', Auth::user()->getAuthIdentifier());
        session()->put('impersonated_id', $user->getAuthIdentifier());

        // Auth::loginUsingId($user->getAuthIdentifier());
    }

    public function fields()
    {
        return [];
    }

    public function authorize($user, $model)
    {
        return $user->isSuper() && $user->id !== $model->id;
    }
}
