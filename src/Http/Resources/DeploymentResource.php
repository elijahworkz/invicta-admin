<?php

namespace Eteacher\InvictaAdmin\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeploymentResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'version' => $this->version,
            'user' => $this->user->name,
            'status' => $this->status,
            'created' => $this->created_at->toFormattedDateString(),
        ];
    }
}
