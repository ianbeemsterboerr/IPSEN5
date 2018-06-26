<?php

use App\Team;
use App\Tournament;
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
        )->each(function (Tournament $tournament) {
            App\Team::inRandomOrder()->get()->filter(
                function (Team $team) use ($tournament) {
                    return $team->canParticipate($tournament);
                }
            )->take(10)->each(
                function (Team $team) use ($tournament) {
                    $tournament->enrollments()->create(['team_id' => $team->id]);
                }
            );
        });
    }
}
