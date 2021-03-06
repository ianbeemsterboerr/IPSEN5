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
        )->each(function (App\User $admin) {
            $team = new \App\Team();
            $team->fill(
                [
                    'name' => $admin->username,
                    'leader_user_id' => $admin->id,
                    'size' => 1,
                    'max_size' => 1
                ]
            );
            $team->save();

            $teamMember = new \App\TeamMember();
            $teamMember->fill([
                'user_id' => $admin->id,
                'team_id' => $team->id
            ]);
            $teamMember->save();
        });

        factory(App\User::class, 75)->create()->each(function ($u) {
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
