<?php

use Illuminate\Database\Seeder;

class UsersSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($x = 0; $x <= 100; $x++) {
            
        
        DB::table('user')->insert([
            'user_username' => str_random(10),
            'user_email' => str_random(10).'@gmail.com',
            'user_password' => str_random(255),
            'user_first_name' => str_random(10),
            'user_last_name' => str_random(14),
            'user_description' => str_random(40),
            'user_salt' => str_random(126),
            'user_force_pw_change' => 0,
            'user_force_name_change' => 0,
            'user_guest' => 0, 
            'user_webtoken' => str_random(255)
        ]);
    }
    }
}
