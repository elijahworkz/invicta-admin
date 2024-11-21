<?php

namespace Elijahworkz\InvictaAdmin\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ItemsCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return ['data' => $this->collection->each(function ($item) {
            $item->created = Carbon::parse($item->created_at)->toFormattedDateString();
        })];
    }
}
