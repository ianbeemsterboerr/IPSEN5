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
use App\Match_special;
use App\Opponent;
use App\Tournament;
use App\Result;

class PouleTournament implements ITournament
{


    public function runMatchmaker(Tournament $tournament)
    {


        // deletes existing match_special data
        foreach ($tournament->matches()->get()->toArray() as $match){
            $special = new Match_special();
            $special = $special->where('match_id', $match['id']);
            $special->delete();
        }

        $tournament->matches()->delete();


        $enrollments = $tournament->enrollments()->with('team')->inRandomOrder()->get()->toArray();
        $enrollmentCount = count($enrollments);
        $this->generateMatches($tournament, $tournamentBracketsArray, $enrollments, $enrollmentCount);
    }


    private function generateMatches($tournament, &$tournamentBracketsArray, $enrollments, $enrollmentCount)
    {
        $pouleCount = ($enrollmentCount / 4);
        $pouleCount > floor($pouleCount)? $pouleCount = floor($pouleCount + 1) : null;
        $counter = 0;

        $poules = [];

        for($i = 0; $i < $pouleCount; $i++){
            $poules[$i] = [];

        }

        foreach ($enrollments as $enrollment){
            $poules[$counter][count($poules[$counter])] = $enrollment;
            $counter++;
            $counter > $pouleCount - 1? $counter = 0: null;
        }


        foreach ($poules as $poule){
            $this->generatePouleMatches($tournament, $poule, array_search($poule, $poules));
        }

    }

    private function generatePouleMatches($tournament, $poule, $pouleNumber){

        foreach ($poule as $enrollment1){
            foreach ($poule as $enrollment2){
                if (array_search($enrollment1, $poule) < array_search($enrollment2, $poule)){
                    $this->makeMatchWithOpponents($tournament, [$enrollment1, $enrollment2], $pouleNumber);
                }
            }
        }

    }

    private function makeMatchWithOpponents($tournament, $opponents, $pouleNumber)
    {
        $match = new Match();
        $match->fill([
            'tournament_id' => $tournament->id
        ]);
        $match->save();

        $match_special = new Match_special();
        $match_special->fill([
            'match_id' => $match->id,
            'data' => $pouleNumber
        ]);
        $match_special->save();

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

    public function onResultsUpdated(Match $match)
    {
        // TODO: Implement onResultsUpdated() method.
    }

}