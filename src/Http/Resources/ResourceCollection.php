<?php

namespace Eteacher\InvictaAdmin\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ResourceCollection extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'created_at' => $this->created_at,
        ];
    }
}
