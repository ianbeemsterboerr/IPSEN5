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
        factory(App\Tournament::class, 5)->create(
            [
                'organizer_user_id' => 1
            ]
        )->each(function ($tournament) {
            $teams = App\Team::inRandomOrder()->where('max_size', '<=', $tournament->max_team_size)->take(rand(5, 20))->get();

            foreach ($teams as $team) {
                $enrollment = new App\Enrollment();
                $enrollment->fill(
                    [
                        'team_id' => $team->id,
                        'tournament_id' => $tournament->id
                    ]
                )->save();
            }
        });
    }
}
