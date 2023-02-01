<?php

namespace Eteacher\InvictaAdmin\Providers;

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
        Broadcast::routes(['prefix' => 'admin', 'middleware' => ['auth:sanctum']]);

        Broadcast::channel('resource.{resource}.{item}', function ($user, $resource, $item) {
            dd($user);

            return $this->userToArray($user);
        });

        // Broadcast::channel('globals.{id}.{site}', function ($user, $id, $site) {
        //     return $this->userToArray($user);
        // }, ['guards' => ['statamic']]);
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
