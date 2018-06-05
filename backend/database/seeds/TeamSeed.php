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
        factory(App\Team::class, 40)->create()->each(function ($u) {
            $memberCount = rand(1, 3);
            $members = factory(App\User::class, $memberCount)->create();

            foreach ($members as $member) {
                $tMember = new App\TeamMember;
                $tMember->fill(
                    [
                        'user_id' => $member->id,
                        'team_id' => $u->id
                    ]
                )->save();
            }
        });
    }
}
