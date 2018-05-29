<?php

use Illuminate\Database\Seeder;

class TournamentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($x = 0; $x <= 3; $x++) {

        
			DB::table('tournament')->insert([
				'organizer_userID' => 1,
				'gamename' => str_random(10),
				'tournament_typename' => str_random(10),
				'signup_typename' => str_random(10),
				'name' => str_random(10),
				'description' => str_random(40),
				'signup_start' => '2000-01-01',
				'signup_end' => '2000-01-01',
				'tournament_start' => '2000-01-01'
			]);
		}
    }
}
