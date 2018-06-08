<?php

use App\User;

/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 06/06/2018
 * Time: 15:45
 */

class FifaEliminationTest extends TestCase
{
    private function makeDummyTournament(int $teamCount) {
        $organizer = factory(App\User::class)->create();
        $tournament = factory(App\Tournament::class)->create(
            [
                'max_team_size' => 1
            ]
        );

        factory(App\Team::class, $teamCount)->create(
            [
                'max_size' => $tournament->max_team_size,
            ]
        )->each(
            function ($team) use ($tournament) {

                factory(App\TeamMember::class)->create(
                    [
                        'team_id' => $team->id,
                        'user_id' => factory(App\User::class)->create()->id
                    ]
                );

                $enrollment = new \App\Enrollment(
                    [
                        'tournament_id' => $tournament->id,
                        'team_id' => $team->id
                    ]
                );

                $enrollment->save();
            }
        );

        return $tournament;
    }

    public function testMatchGeneration() {
        $tournament = $this->makeDummyTournament(10);

        $matchmaker = new App\Http\Controllers\Fifa\EliminationTournament();

        $enrollments = $tournament->enrollments()->get()->toArray();
        $brackets = [];
        $matchmaker->generatePlacementMatches($tournament, $brackets, $enrollments);
    }
}