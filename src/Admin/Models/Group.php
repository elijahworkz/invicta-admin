<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    public $fillable = [
        'handle',
        'title',
    ];

    /**
     * Get the table associated with the model.
     *
     * @return string
     */
    public function getTable()
    {
        return config('invicta.auth_tables.groups');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(invicta_user_model());
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }

    /**
     * model events.
     */
    protected static function boot()
    {
        parent::boot();

        // add access the control panel after group created
        self::created(function ($model) {
            $model->permissions()->create([
                'ability' => 'access invicta',
            ]);
        });
    }
}
