<?php

use Illuminate\Database\Seeder;

class TeamSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Team::class, 50)->create()->each(function ($u) {
            $memberCount = rand(2, 5);
            App\User::inRandomOrder()->take($memberCount)->get()->each(function ($member) use ($u) {
                $u->teamMembers()->create(['user_id' => $member->id]);
            });
        });
    }
}
