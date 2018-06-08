<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 01/06/2018
 * Time: 10:45
 */

namespace App\Http\Controllers\Fifa;


use App\Http\Controllers\ITournament;
use App\Match;
use App\Opponent;
use App\Tournament;
use App\Result;

class EliminationTournament implements ITournament
{
    public function runMatchmaker(Tournament $tournament)
    {
        $tournament->matches()->delete();

        $enrollments = $tournament->enrollments()->with('team')->inRandomOrder()->get()->toArray();
        $enrollmentCount = count($enrollments);
        $tournamentBracketsArray = [];

        $this->generatePlacementMatches($tournament, $tournamentBracketsArray, $enrollments);
        $this->generateMatches($tournament, $tournamentBracketsArray, $enrollmentCount);
        $this->connectMatches($tournamentBracketsArray);
    }

    public function generateMatches($tournament, &$tournamentBracketsArray, $enrollmentCount)
    {
        $teamCount = $this->next_pow($enrollmentCount) / 2;
        $bracketCount = log($teamCount, 2);

        for ($i = 0; $i < $bracketCount - 1; $i++) {
            $lastBracket = end($tournamentBracketsArray);

            $matchCount = $teamCount / 2 / pow(2, $i + 1);
            $bracket = [];

            for ($a = 0; $a < $matchCount; $a++) {
                $match = new Match();
                $match->fill([
                    'tournament_id' => $tournament->id
                ]);
                $match->save();

                $lastBracket[$a * 2]->parent_match_id = $match->id;
                $lastBracket[$a * 2]->save();

                array_push($bracket, $match);
            }

            array_push($tournamentBracketsArray, $bracket);
        }
    }

    public function generatePlacementMatches(Tournament $tournament, &$brackets, &$enrollments)
    {
        $teamCount = count($enrollments);

        if ($this->is_pow($teamCount)) {
            // No placement matches required

            $bracket = [];
            for ($i = 0; $i < $teamCount / 2; $i++) {
                $match = $this->makeMatchWithOpponents(
                    $tournament,
                    [
                        $enrollments[$i * 2],
                        $enrollments[$i * 2 + 1]
                    ]
                );

                array_push($bracket, $match);
            }

            array_push($brackets, $bracket);

            return;
        }

        // Placement matches are required
        $optimalTeamCount = $this->next_pow($teamCount) / 2;
        $optimalMatchCount = $optimalTeamCount / 2;
        $teamDifference = $teamCount - $optimalTeamCount;

        $possibleConnections = floor($teamDifference / 2);

        // amount of matches with 2 teams playing against each other
        $completeMatchCount = $optimalMatchCount - $possibleConnections;


        // amount of matches with one undetermined opponent
        $incompleteMatchCount = min($optimalMatchCount - $completeMatchCount, $optimalMatchCount);

        $takenTeams =$completeMatchCount*2 + $incompleteMatchCount;
        $remainingTeams = $teamCount-$takenTeams;
        $possibleConnections = floor($remainingTeams / 2);

        if ($possibleConnections > $incompleteMatchCount) {
            $completeMatchCount--;
            $incompleteMatchCount++;
        }

        if ($remainingTeams == 1) {
            $completeMatchCount--;
            $incompleteMatchCount++;
        }

//        if ($teamCount != 19) {
//            dd([
//                'teams' => $teamCount,
//                'optimal teams' => $optimalTeamCount,
//                'optimal match' => $optimalMatchCount,
//                'diff' => $teamDifference,
//                'complete matches' => $completeMatchCount,
//                'incomplete matches' => $incompleteMatchCount,
//                'taken teams' => $takenTeams,
//                'remaining teams' => $teamCount-$takenTeams
//            ]);
//        }


        // make bracket and add x complete matches
        $bracket = [];
        $this->makeXMatches($tournament, $bracket, $enrollments, $completeMatchCount);

        // Add the incomplete matches
        for ($i = 0; $i < $incompleteMatchCount; $i++) {
            $match = $this->makeMatchWithOpponents($tournament, $this->takeXTeams($enrollments, 1));
            array_push($bracket, $match);
        }

        $this->generatePlacementMatches($tournament, $brackets, $enrollments);

        array_push($brackets, $bracket);
    }

    private function connectMatches($brackets)
    {
        foreach ($brackets as $key => $bracket) {
            // No need to connect the last match, the fact that it has no connection makes it detectable as last match
            if ($bracket == end($brackets)) {
                break;
            }

            $nextBracket = $brackets[++$key];

            /* @var $match Match */
            foreach ($bracket as $match) {
                if ($match->parent_match_id == null) {
                    /* @var $nextMatch Match */
                    foreach ($nextBracket as $nextMatch) {
                        $spots = 2 - $nextMatch->opponents()->count() - $nextMatch->childMatches()->count();
                        if ($spots > 0) {
                            $match->parent_match_id = $nextMatch->id;
                            $match->save();

                            break;
                        }
                    }
                }
            }
        }
    }

    private function makeXMatches($tournament, &$bracket, &$teams, $amount)
    {
        $matchTeams = $this->takeXTeams($teams, $amount * 2);

        $matches = [];

        for ($i = 0; $i < $amount; $i++) {
            $match = $this->makeMatchWithOpponents($tournament, [$matchTeams[$i * 2], $matchTeams[$i * 2 + 1]]);
            array_push($bracket, $match);
        }

        return $matches;
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

    private function next_pow($number)
    {
        if ($number < 2) return 1;
        for ($i = 0; $number > 1; $i++) {
            $number = $number >> 1;
        }
        return 1 << ($i + 1);
    }

    private function is_pow($number)
    {
        return ($number & ($number - 1)) == 0;
    }


}