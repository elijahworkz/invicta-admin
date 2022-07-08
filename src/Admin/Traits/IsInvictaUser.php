<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

use Eteacher\InvictaAdmin\Admin\Models\Group;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait IsInvictaUser
{
    public function isSuper(): bool
    {
        return $this->groups()->where('group_id', 1)->count();
    }

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, config('invicta.auth_tables.group_user'), 'user_id', 'group_id');
    }

    /**
     * Check if user belongs to a group either by id or name.
     *
     * @param	int|string  $identifier
     * @return  bool
     */
    public function group($identifier): bool
    {
        $column = is_numeric($identifier) ? 'id' : 'name';

        return $this->groups()->where($column, $identifier)->count();
    }

    public function addToGroup($group_id)
    {
        $this->groups()->attach($group_id);
    }

    public function removeFromGroup($group_id)
    {
        $this->groups()->detach($group_id);
    }

    public function hasPermission()
    {
        // code...
    }
}
