<?php

namespace Eteacher\InvictaAdmin\Admin\Resources;

class ResourceRegistrar
{
    protected static $items = [];

    protected static $test = 'Something';

    public static function get($handle)
    {
        return static::$items[$handle] ?? null;
    }

    public static function put($handle, $resource)
    {
        static::$items[$handle] = $resource;
    }

    public static function clear()
    {
        static::$items = [];
    }

    public static function getTest()
    {
        return static::$test;
    }

    public static function test($value)
    {
        static::$test = $value;
    }
}
