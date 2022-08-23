<?php

namespace Eteacher\InvictaAdmin\Admin\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    /**
     * Get the table associated with the model.
     *
     * @return string
     */
    public function getTable()
    {
        return config('invicta.auth_tables.groups');
    }

    public function users()
    {
        return $this->belongsToMany(invicta_user_model());
    }

    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }

    public function scopeInvictaList($query)
    {
        return $query->where('is_super', 0);
    }
}
