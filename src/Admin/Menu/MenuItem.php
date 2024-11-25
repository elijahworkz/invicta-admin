<?php

namespace Elijahworkz\InvictaAdmin\Admin\Menu;

use BadMethodCallException;
use Elijahworkz\InvictaAdmin\Admin\Models\GlobalSetting;
use Elijahworkz\InvictaAdmin\Admin\Models\Group;
use Elijahworkz\InvictaAdmin\Admin\Models\Resources\GlobalSetting as GlobalSettingResource;
use Elijahworkz\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Elijahworkz\InvictaAdmin\Admin\Traits\Makeable;
use Elijahworkz\InvictaAdmin\Facades\Permission;
use Elijahworkz\InvictaAdmin\InvictaAdmin;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Schema;

class MenuItem
{
    use Makeable;

    public $url = '/';

    public $external = false;

    public $icon = null;

    public $badge = null;

    public $group = null;

    public $children = false;

    public $hasDivider = false;

    public $callback = null;

    protected $resource = false;

    protected $ability;

    /**
     *  Make new Menu Item.
     */
    public function __construct(public $name) {}

    public function label($value)
    {
        $this->name = $value;

        return $this;
    }

    public function route($path)
    {
        $this->url = $path;

        return $this;
    }

    public function can($ability = null)
    {
        if (is_null($ability)) {
            return $this->ability;
        }

        $this->ability = $ability;

        return $this;
    }

    public function icon($name)
    {
        $this->icon = InvictaAdmin::svg($name);

        return $this;
    }

    public function badge($value)
    {
        $this->badge = is_callable($value)
            ? $value()
            : $value;

        return $this;
    }

    protected function getBadge()
    {
        return $this->resource
            ? $this->resource->badge() ?? null
            : $this->badge;
    }

    public function divider()
    {
        $this->hasDivider = true;

        return $this;
    }

    public function group($name)
    {
        $this->group = $name;

        return $this;
    }

    public function link($external = false)
    {
        $this->external = $external;

        return $this;
    }

    public static function resource($resourceClass)
    {
        $resource = App::make($resourceClass);
        $resource->setPermissions();
        $handle = $resource->handle();
        ResourceRegistrar::put($handle, $resource);

        $self = new static($resource->menuTitle());

        $self->resource = $resource;

        return $self
            ->route($resource->route())
            ->can('view '.$handle)
            ->icon($resource->icon());
    }

    public static function permissions($name)
    {
        $self = new static($name);
        $self->callback = 'buildPermissions';
        $self->label($name)->icon('shield-key')->can('view permissions');

        return $self;
    }

    public function buildPermissions()
    {
        $children = [];
        if (! Schema::hasTable('groups')) {
            return null;
        }
        $groups = Group::orderByDesc('id')->get();
        if (! count($groups)) {
            return null;
        }

        foreach ($groups as $group) {
            $route = "/group/$group->id/permissions";
            $children[] = MenuItem::make($group->title)->route($route)->can('edit permissions');
        }
        $this->children($children);

        return $this;
    }

    public static function globals($name)
    {
        if (! ResourceRegistrar::has('global_settings')) {
            self::registerGlobalSettingsResource();
        }
        $self = new static($name);
        $self->callback = 'buildGlobalSettings';
        $self->label($name)->can('view global_settings');

        return $self;
    }

    public static function global($handle)
    {
        if (! ResourceRegistrar::has('global_settings')) {
            self::registerGlobalSettingsResource();
        }
        // handle is set as name and will be used to get the global later at the build stage
        $self = new static($handle);
        $self->callback = 'addGlobalSettingItem';

        return $self;
    }

    private static function registerGlobalSettingsResource(): void
    {
        ResourceRegistrar::put('global_settings', App::make(GlobalSettingResource::class));
    }

    public function buildGlobalSettings()
    {
        $handle = 'global_settings';
        $children = [];
        $permissions = [];

        $globals = GlobalSetting::select(['id', 'title'])->locale()->get();
        if (! count($globals)) {
            return null;
        }

        foreach ($globals as $global) {
            $permission = "edit {$handle}_item $global->id";
            $route = "/resource/$handle/$global->id/edit";
            $children[] = MenuItem::make($global->title)->can([$permission, "edit $handle"])->route($route);

            // Permissions for global settings
            $permissions[] = Permission::make($permission)->label("Edit $global->title");
        }

        Permission::group($handle)->label('Global Settings')
            ->permissions([
                Permission::make("view $handle")
                    ->children([
                        Permission::make("create new $handle"),
                        Permission::make("edit $handle")->label('Edit all settings'),
                        Permission::make("edit $handle items")
                            ->label('Select settings to allow to edit')
                            ->children($permissions),
                        Permission::make("delete $handle"),
                    ]),
            ]);
        $this->children($children);

        return $this;
    }

    public function addGlobalSettingItem()
    {
        $global = GlobalSetting::select(['id', 'title'])->where('handle', $this->name)->locale()->first();

        if (! $global) {
            return null;
        }
        $permission = "view {$this->name}_global";
        Permission::make($permission)->label("View $global->title");

        $this->label($global->title)->route("/resource/global_settings/$global->id/edit")->can($permission);

        return $this;
    }

    public function children(array $items)
    {
        if ($this->resource) {
            throw new BadMethodCallException('You cannot add children to resource type menu item.');
        }
        // we should get an array of menuItem instances here
        $this->children = $items;

        return $this;
    }

    public function render($child = false)
    {
        // For special menu items like groups - we want to
        // have custom render where the logic of
        return [
            'name' => $this->name,
            'url' => $this->url,
            'icon' => $this->icon,
            'badge' => $this->getBadge(),
            'external' => $this->external,
            'group' => $this->group,
            'divider' => $this->hasDivider,
            'children' => $this->children
                ? collect($this->children)->map(function ($item) {
                    return $item->render(true);
                })
                : null,
        ];
    }
}
