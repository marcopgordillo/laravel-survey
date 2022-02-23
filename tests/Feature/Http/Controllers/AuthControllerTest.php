<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use LazilyRefreshDatabase, WithFaker;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_user_can_be_registered()
    {
        $response = $this->postJson(route('auth.register'), [
            'name'                  => $this->faker->name,
            'email'                 => $this->faker->email,
            'password'              => 'Pa$$w0rd',
            'password_confirmation' => 'Pa$$w0rd',
        ]);

        $response->assertCreated()
                ->assertJsonPath('data.user.id', 1);

        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseHas('users', ['id' => 1]);
    }
}
