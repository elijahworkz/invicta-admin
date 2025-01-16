<?php

namespace Elijahworkz\InvictaAdmin\Admin\Resources;

class ResourceRegistrar
{
    protected static $items = [];

    public static function get($handle)
    {
        return isset(static::$items[$handle])
            ? static::$items[$handle]
            : abort(404);
    }

    public static function all()
    {
        return static::$items;
    }

    public static function put($handle, $resource)
    {
        static::$items[$handle] = $resource;
    }

    public static function has($handle)
    {
        return isset(static::$items[$handle]);
    }

    public static function clear()
    {
        static::$items = [];
    }
}
