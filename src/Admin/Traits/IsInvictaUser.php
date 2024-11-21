<?php

namespace Elijahworkz\InvictaAdmin\Admin\Traits;

use Elijahworkz\InvictaAdmin\Admin\Models\Group;
use Elijahworkz\InvictaAdmin\Admin\Models\Permission;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Support\Facades\Hash;

trait IsInvictaUser
{
    use Authorizable;

    protected $permissions = null;

    protected static $beforeSaveHook;

    protected static $afterSaveHook;

    public function isDev(): bool
    {
        return $this->dev ?? false;
    }

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, config('invicta.auth_tables.group_user'), 'user_id', 'group_id');
    }

    /**
     * Check if user belongs to a group either by id or handle.
     *
     * @param  int|string  $identifier
     */
    public function group($identifier): bool
    {
        $column = is_numeric($identifier) ? 'id' : 'handle';

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

    public function permissions()
    {
        if (! $this->permissions) {
            $this->permissions = $this->getPermissions();
        }

        return $this->permissions;
    }

    protected function getPermissions()
    {
        $groupIds = $this->groups()->pluck('id');

        $permissions = Permission::select('ability')->whereIn('group_id', $groupIds)->groupBy('ability')->get();

        return $permissions->count() ? $permissions->pluck('ability') : collect([]);
    }

    public function hasPermission($permissions)
    {
        if ($this->isDev()) {
            return true;
        }

        $groupsPermissions = $this->permissions();

        if (! $groupsPermissions->count()) {
            return false;
        }

        if (is_array($permissions)) {
            return $groupsPermissions->contains(fn ($val) => in_array($val, $permissions));
        }

        return $groupsPermissions->contains($permissions);
    }

    /**
     *  password mutator.
     */
    protected function password(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => $value ? Hash::make($value) : $this->password
        );
    }

    public static function getBeforeSaveHook()
    {
        return static::$beforeSaveHook;
    }

    public static function getAfterSaveHook()
    {
        return static::$afterSaveHook;
    }

    public static function runBeforeSave($hook)
    {
        static::$beforeSaveHook = $hook;
    }

    public static function runAfterSave($hook)
    {
        static::$afterSaveHook = $hook;
    }
}
