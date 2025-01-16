<?php

namespace Elijahworkz\InvictaAdmin\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Broadcast::routes(['prefix' => 'admin', 'middleware' => ['invicta']]);

        Broadcast::channel('invicta-admin', function ($user) {
            return true;
        });

        Broadcast::channel('resource.{resource}.{item}', function ($user, $resource, $item) {
            return $this->userToArray($user);
        });
    }

    private function userToArray($user)
    {
        return [
            'name' => $user->name,
            'id' => $user->id,
            'title' => $user->title,
            'email' => $user->email,
            'initials' => Str::of($user->name)->initials(),
        ];
    }
}
