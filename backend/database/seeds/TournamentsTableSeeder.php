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
        factory(App\Tournament::class, 5)->create()->each(function ($o) {
            $teams = App\Team::where('max_size', '<=', $o->max_team_size);

        });
    }
}
