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
        factory(App\Team::class, 50)->create(['max_size'=>rand(2, 5)])->each(function ($u) {
            $memberCount = rand(2, $u->max_size);
            App\User::inRandomOrder()->take($memberCount)->get()->each(function ($member) use ($u) {
                $u->teamMembers()->create(['user_id' => $member->id]);
            });
        });
    }
}
