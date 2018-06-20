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
        for ($memberCount = 1; $memberCount <= 3; $memberCount++) {
            $members = App\User::inRandomOrder()->take($memberCount * 15)->get()->toArray();

            factory(App\Team::class, 15)->create(['max_size'=>$memberCount])->each(function (App\Team $u) use (&$members, $memberCount) {
                for ($member = 0; $member < $memberCount; $member++) {
                    $member_object = array_pop($members);

                    $u->teamMembers()->create(['user_id' => $member_object['id']]);

                    if ($member == 0) {
                        $u->leader_user_id = $member_object['id'];
                    }
                }
            });
        }
    }
}
