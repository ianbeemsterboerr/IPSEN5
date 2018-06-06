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
        factory(App\User::class, 50)->create()->each(function ($u) {
            $team = new \App\Team();
            $team->fill(
                [
                    'name' => $u->username,
                    'leader_user_id' => $u->id,
                    'size' => 1,
                    'max_size' => 1
                ]
            );
            $team->save();

            $teamMember = new \App\TeamMember();
            $teamMember->fill([
                'user_id' => $u->id,
                'team_id' => $team->id
            ]);
            $teamMember->save();
        });
    }
}
