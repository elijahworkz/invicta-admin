<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Actions;

use Eteacher\InvictaAdmin\Admin\Actions\Action;
use Illuminate\Support\Facades\Auth;

class ImpersonateUser extends Action
{
    public $inline = true;

    public function handle($fields, $models)
    {
        $user = $models->first();

        session()->put('impersonator_id', Auth::user()->getAuthIdentifier());
        session()->put('impersonated_id', $user->getAuthIdentifier());

        return redirect(route('invicta.home'));
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
