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
            factory(App\Team::class, 1)->create(
                [
                    'name' => $u->username,
                    'leader_user_id' => $u->id,
                    'size' => 1,
                    'max_size' => 1
                ]
            );
        });
    }
}
