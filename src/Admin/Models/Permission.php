<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $fillable = ['ability'];

    /**
     * Get the table associated with the model.
     *
     * @return string
     */
    public function getTable()
    {
        return config('invicta.auth_tables.permissions');
    }

    public function users()
    {
        return $this->belongsToMany($this->userModel());
    }

    protected function userModel()
    {
        $provider = config('auth.guards')[config('invicta.auth.guard')]['provider'];

        $model = config('auth.providers')[$provider]['model'];
    }

    public function groups()
    {
        // return $this->hasMany(Permission:class);
    }
}
