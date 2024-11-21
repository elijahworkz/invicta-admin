<?php

namespace Elijahworkz\InvictaAdmin\Admin\Commands;

use Illuminate\Support\Facades\App;

class CommandRegistrar
{
    protected static $items = [];

    public static function get($handle)
    {
        return isset(static::$items[$handle])
            ? static::$items[$handle]
            : abort(404);
    }

    public static function all($user)
    {
        return collect(static::$items)->filter(function ($command) use ($user) {
            return $command->authorize($user);
        })->values();
    }

    public static function register($commands)
    {
        if (is_array($commands)) {
            foreach ($commands as $command) {
                self::put($command);
            }
        } else {
            self::put($commands);
        }
    }

    public static function put($class)
    {
        $command = App::make($class);
        static::$items[$command->handle()] = $command;
    }

    public static function clear()
    {
        static::$items = [];
    }
}
