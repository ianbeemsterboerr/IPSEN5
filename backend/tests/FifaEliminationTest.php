<?php

use App\User;
use Laravel\Lumen\Testing\DatabaseMigrations;

/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 06/06/2018
 * Time: 15:45
 */

class FifaEliminationTest extends TestCase
{

    use DatabaseMigrations;

    private function makeDummyTournament(int $teamCount) {
        factory(App\User::class)->create(); // organizer
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

    //This test skips the randomizing part of matchmaking creating predictable results
    public function testMatchGeneration() {
        $tournament = $this->makeDummyTournament(10);
        $matchmaker = new App\Http\Controllers\Fifa\EliminationTournament();

        $enrollments = $tournament->enrollments()->get()->toArray();
        $brackets = [];
        $matchmaker->generatePlacementMatches($tournament, $brackets, $enrollments);
        $matchmaker->connectMatches($brackets);

        // first opponent of last match should be first team that was generated if algorithm completed successfully
        $this->assertEquals(1, $tournament->matches()->get()->last()->opponents()->get()->first()->team_id);

        // 3 brackets would be needed to house 10 teams
        $this->assertEquals(3, count($brackets));

        // first bracket should have 1 match
        $this->assertEquals(1, count($brackets[0]));

        // first bracket's match should have 2 opponents
        $this->assertEquals(2, $brackets[0][0]->opponents()->count());

        // first bracket's match should be connected to second bracket's match
        $this->assertEquals($brackets[1][0]->id, $brackets[0][0]->parent_match_id);
    }

    public function testPlacementMatchesWithPower2AmountOfTeams() {
        $tournament = $this->makeDummyTournament(8);
        $matchmaker = new App\Http\Controllers\Fifa\EliminationTournament();

        $enrollments = $tournament->enrollments()->get()->toArray();
        $brackets = [];
        $matchmaker->generatePlacementMatches($tournament, $brackets, $enrollments);

        //With a power of 2 amount of teams no placement matches should be required. 8/2= 4 matches expected
        $this->assertEquals(4, count($brackets[0]));
    }
}