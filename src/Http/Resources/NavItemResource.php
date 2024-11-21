<?php

namespace Elijahworkz\InvictaAdmin\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NavItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
        ];
    }
}
