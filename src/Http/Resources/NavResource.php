<?php

namespace Elijahworkz\InvictaAdmin\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NavResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'handle' => $this->handle,
            'error' => $this->tree['error'] ?? false,
        ];
    }
}
