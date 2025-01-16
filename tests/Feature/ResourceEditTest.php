<?php

namespace Elijahworkz\InvictaAdmin\Tests\Feature;

use Elijahworkz\InvictaAdmin\Tests\Models\User;
use Elijahworkz\InvictaAdmin\Tests\TestCase;
use Illuminate\Support\Facades\Event;

class ResourceEditTest extends TestCase
{
    /** @test */
    public function an_event_is_emitted_when_blueprint_is_found()
    {
        // Given
        Event::fake();

        $user = User::factory()->create();

        // When

        // Then

        $this->markTestIncomplete('Not yet implemented');
    }
}
