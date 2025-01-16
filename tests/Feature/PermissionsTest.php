<?php

namespace Elijahworkz\InvictaAdmin\Tests\Feature;

use Elijahworkz\InvictaAdmin\Admin\Models\Group;
use Elijahworkz\InvictaAdmin\Admin\Models\Resources\Group as GroupResource;
use Elijahworkz\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Elijahworkz\InvictaAdmin\Tests\Models\Invicta\Resources\User as UserResource;
use Elijahworkz\InvictaAdmin\Tests\TestCase;
use Illuminate\Support\Facades\App;

class PermissionsTest extends TestCase
{
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $resources = [GroupResource::class, UserResource::class];

        foreach ($resources as $resourceClass) {
            $resource = App::make($resourceClass);

            ResourceRegistrar::put($resource->handle(), $resource);
        }

        $this->user = $this->getUser();
    }

    public function test_permissions_can_be_edit()
    {
        $this->user = $this->getUser(true);

        $editGroup = $this->createGroupWithAbilities(['access invicta']);

        $newPermissopns = ['access invicta', 'view groups', 'edit groups'];

        $response = $this->actingAs($this->user, config('invicta.auth.guard'))
            ->post(route('invicta.permission.update', ['group' => $editGroup->id]), ['permissions' => $newPermissopns]);

        $response->assertStatus(302);

        $this->assertSame($editGroup->permissions()->get()->pluck('ability')->toArray(), $newPermissopns);
    }

    public function test_user_has_permission_to_control_panel()
    {
        $group = $this->createGroupWithAbilities(['access invicta']);

        $this->user->groups()->sync($group->id);

        $response = $this
            ->withoutExceptionHandling()
            ->actingAs($this->user, config('invicta.auth.guard'))
            ->get(route('invicta.home'));

        $response->assertStatus(200);
    }

    public function test_user_has_not_permission_to_control_panel()
    {
        $group = $this->createGroupWithAbilities(['view groups']);

        $this->user->groups()->sync($group->id);

        $response = $this
            ->actingAs($this->user, config('invicta.auth.guard'))
            ->get(route('invicta.home'));

        $response->assertForbidden();
    }

    public function test_user_has_permission_to_resource_index()
    {
        $group = $this->createGroupWithAbilities(['access invicta', 'view groups']);

        $this->user->groups()->sync($group->id);

        $response = $this
            ->withoutExceptionHandling()
            ->actingAs($this->user, config('invicta.auth.guard'))
            ->get(route('invicta.resource.index', ['resource' => 'groups']));

        $response->assertStatus(200);
    }

    public function test_user_has_not_permission_to_resource_index()
    {
        $group = $this->createGroupWithAbilities(['access invicta']);

        $this->user->groups()->sync($group->id);

        $response = $this
            ->actingAs($this->user, config('invicta.auth.guard'))
            ->get(route('invicta.resource.index', ['resource' => 'groups']));

        $response->assertForbidden();
    }

    public function test_user_has_permission_to_resource_editing()
    {
        $group = $this->createGroupWithAbilities(['access invicta', 'view groups', 'edit groups']);

        $this->user->groups()->sync($group->id);

        $response = $this
            ->withoutExceptionHandling()
            ->actingAs($this->user, config('invicta.auth.guard'))
            ->get(route('invicta.resource.edit', ['resource' => 'groups', 'item' => $group->id]));

        $response->assertStatus(200);
    }

    public function test_user_has_not_permission_to_resource_item_editing()
    {
        $group = $this->createGroupWithAbilities(['access invicta', 'view groups']);

        $this->user->groups()->sync($group->id);

        $response = $this
            ->actingAs($this->user, config('invicta.auth.guard'))
            ->get(route('invicta.resource.edit', ['resource' => 'groups', 'item' => $group->id]));

        $response->assertForbidden();
    }

    public function test_user_has_permission_to_resource_item_creating()
    {
        $group = $this->createGroupWithAbilities(['access invicta', 'view groups', 'create groups']);

        $this->user->groups()->sync($group->id);

        $response = $this
            ->withoutExceptionHandling()
            ->actingAs($this->user, config('invicta.auth.guard'))
            ->get(route('invicta.resource.create', ['resource' => 'groups']));

        $response->assertStatus(200);
    }

    public function test_user_has_not_permission_to_resource_item_creating()
    {
        $group = $this->createGroupWithAbilities(['access invicta', 'view groups', 'delete groups']);

        $this->user->groups()->sync($group->id);

        $response = $this
            ->actingAs($this->user, config('invicta.auth.guard'))
            ->get(route('invicta.resource.create', ['resource' => 'groups']));

        $response->assertForbidden();
    }

    public function test_user_has_permission_to_resource_item_deleting()
    {
        $group = $this->createGroupWithAbilities(['access invicta', 'view groups', 'delete groups']);

        $this->user->groups()->sync($group->id);

        $groupDeleted = $this->createGroupWithAbilities(['access invicta'], 'delete');

        $response = $this
            ->withoutExceptionHandling()
            ->actingAs($this->user, config('invicta.auth.guard'))
            ->delete(route('invicta.resource.destroy', ['resource' => 'groups']), ['selected' => [$groupDeleted->id]]);

        $response->assertStatus(302);

        $this->assertNull(Group::find($groupDeleted->id));
    }

    public function test_user_has_not_permission_to_resource_item_deleting()
    {
        $group = $this->createGroupWithAbilities(['access invicta', 'view groups']);

        $this->user->groups()->sync($group->id);

        $groupDeleted = $this->createGroupWithAbilities(['access invicta'], 'delete');

        $response = $this
            ->actingAs($this->user, config('invicta.auth.guard'))
            ->delete(route('invicta.resource.destroy', ['resource' => 'groups']), ['selected' => [$groupDeleted->id]]);

        $response->assertForbidden();
    }
}
