<?php

namespace Elijahworkz\InvictaAdmin\Admin\Traits;

trait Makeable
{
    /**
     * Create new element.
     *
     * @return static
     */
    public static function make(...$arguments)
    {
        return new static(...$arguments);
    }
}
