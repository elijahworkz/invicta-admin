<?php

namespace Elijahworkz\InvictaAdmin\Admin\Traits;

use Illuminate\Support\Facades\App;

trait Localized
{
    public function scopeLocale($query)
    {
        return $query->where('locale', App::currentLocale());
    }
}
