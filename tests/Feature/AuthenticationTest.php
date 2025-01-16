<?php

namespace Elijahworkz\InvictaAdmin\Tests\Feature;

use Elijahworkz\InvictaAdmin\Tests\Models\User;
use Elijahworkz\InvictaAdmin\Tests\TestCase;

class AuthenticationTest extends TestCase
{
    public function test_users_can_authenticate_using_the_login_screen()
    {
        $user = User::factory()->create();

        $this->assertNotNull($user);

        $this
            ->withoutExceptionHandling()
            ->post(route('invicta.login'), [
                'email' => $user->email,
                'password' => 'password',
            ]);

        $this->assertAuthenticated(config('invicta.auth.guard'));
    }

    public function test_users_can_not_authenticate_with_invalid_password()
    {
        $user = User::factory()->create();

        $this->post(route('invicta.login'), [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }
}
