<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 01/06/2018
 * Time: 10:45
 */

namespace App\Http\Controllers\Fifa;


use App\Enrollment;
use App\Http\Controllers\ITournament;
use App\Match;
use App\Opponent;
use App\Tournament;
use App\Result;

class PouleTournament implements ITournament
{


    public function runMatchmaker(Tournament $tournament)
    {
        $tournament->matches()->delete();

        $enrollments = $tournament->enrollments()->with('team')->inRandomOrder()->get()->toArray();
        $enrollmentCount = count($enrollments);

        $this->generatePoules($tournament, $enrollments, $enrollmentCount);


        $this->generateMatches($tournament, $tournamentBracketsArray, $enrollmentCount);
    }

    private function generatePoules($tournament, $enrollments, $enrollmentCount)
    {
        $pouleCount = ($enrollmentCount / 4);
        $pouleCount > floor($pouleCount)? $pouleCount = floor($pouleCount + 1) : null;
        $counter = 1;

        foreach ($enrollments as $enrollment)
        {
            Enrollment::with('team')->where(
                ['team_id' => $enrollment['team_id'], 'tournament_id' => $enrollment['tournament_id']]
                                                )->update(['poule_id'=> $counter]);
            $counter++;
            $counter > $pouleCount? $counter = 1: null;
        }



    }

    private function generateMatches($tournament, &$tournamentBracketsArray, $enrollmentCount)
    {

        $match = new Match();
        $match->fill([
            'tournament_id' => $tournament->id
        ]);
        $match->save();

    }

    private function makeMatchWithOpponents($tournament, $opponents)
    {
        $match = new Match();
        $match->fill([
            'tournament_id' => $tournament->id
        ]);
        $match->save();

        foreach ($opponents as $opponent) {
            $opponent_object = new Opponent();
            $opponent_object->fill([
                'match_id' => $match->id,
                'team_id' => $opponent['team_id']
            ]);
            $opponent_object->save();

            $result_object = new result();
            $result_object->fill([
                'opponent_id' => $opponent_object->id,
                'score' => 0
            ]);
            $result_object->save();
        }

        return $match;
    }

    private function takeXTeams(&$teams, $amount)
    {
        $takenTeams = [];

        for ($i = 0; $i < $amount; $i++) {
            array_push($takenTeams, array_pop($teams));
        }

        return $takenTeams;
    }

}