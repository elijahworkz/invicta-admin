<?php

namespace Elijahworkz\InvictaAdmin\Tests\Feature;

use Elijahworkz\InvictaAdmin\Tests\Models\User;
use Elijahworkz\InvictaAdmin\Tests\TestCase;
use Illuminate\Support\Facades\Password;

class PasswordResetTest extends TestCase
{
    public function test_password_can_be_reset_with_valid_token()
    {
        $user = User::factory()->create();

        $token = Password::createToken($user);

        $response = $this->post(route('invicta.password.update'), [
            'token' => $token,
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertSessionHasNoErrors();
    }

    public function test_password_can_not_be_reset_with_invalid_token()
    {
        $user = User::factory()->create();

        $token = Password::createToken($user);

        $response = $this->post(route('invicta.password.update'), [
            'token' => $token.'fail',
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertSessionHasErrors();
    }

    public function test_password_can_not_be_reset_with_invalid_password_confirmation()
    {
        $user = User::factory()->create();

        $token = Password::createToken($user);

        $response = $this->post(route('invicta.password.update'), [
            'token' => $token,
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password1',
        ]);

        $response->assertSessionHasErrors();
    }

    public function test_password_can_not_be_reset_with_invalid_email()
    {
        $user = User::factory()->create();

        $user2 = User::factory()->create();

        $token = Password::createToken($user);

        $response = $this->post(route('invicta.password.update'), [
            'token' => $token,
            'email' => $user2->email,
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertSessionHasErrors();
    }
}
