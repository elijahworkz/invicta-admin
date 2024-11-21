<?php

namespace Elijahworkz\InvictaAdmin\Admin\Contracts;

interface InvictaHookContract
{
    public static function run($item, $resourceHandle = null, $action = null);
}
