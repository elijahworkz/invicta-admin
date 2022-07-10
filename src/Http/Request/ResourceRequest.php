<?php

namespace Eteacher\InvictaAdmin\Http\Request;

use Eteacher\InvictaAdmin\Admin\Resources\ResourceRegistrar;

class ResourceRequest extends InvictaRequest
{
    public function resource()
    {
        $handle = $this->route('resource');
        $resourceClass = ResourceRegistrar::get($handle);

        return $resourceClass->resource();
    }
}
