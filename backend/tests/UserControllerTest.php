<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use App\User;
class UserControllerTest extends TestCase
{
    use DatabaseMigrations;
    public function testAuthentication(){
        
        $response = $this->call('GET', '/api/users/get/1');
        $this->assertEquals(401, $response->status());
    }

    public function testRegisterUser(){
        $response = $this->call('POST', '/api/users/register', ['avatar_url' => "null", 'description' => null, 'guest' => null, 'id' => null, 'username' => 'testuser123', 'password' => 'snoopdoggydogg123', 'email' => 'snoop@dogg.com', 'first_name' => 'Snoop', 'last_name' => 'Dogg']);
        echo $response;
        $this->assertEquals(200, $response->status());
        $this->assertDatabaseHas('user', ['email' => 'snoop@dogg.com']);
    }
}