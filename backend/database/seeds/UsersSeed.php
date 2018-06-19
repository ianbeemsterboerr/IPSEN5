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
        factory(App\User::class)->create(
            [
                'username' => 'admin',
                'password' => password_hash('admin', PASSWORD_BCRYPT)
            ]
        );

        factory(App\User::class, 10)->create()->each(function ($u) {
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
