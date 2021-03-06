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
use Illuminate\Http\Response;

class EliminationTournament implements ITournament
{
    public function runMatchmaker(Tournament $tournament)
    {
        $tournament->matches()->delete();

        $enrollments = $tournament->enrollments()->with('team')->inRandomOrder()->get()->toArray();
        $enrollmentCount = count($enrollments);
        $tournamentBracketsArray = [];

        $this->generatePlacementMatches($tournament, $tournamentBracketsArray, $enrollments, 0);
        $this->generateMatches($tournament, $tournamentBracketsArray, $enrollmentCount);
        $this->connectMatches($tournamentBracketsArray);
    }

    private function generateMatches($tournament, &$tournamentBracketsArray, $enrollmentCount)
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

    public function generatePlacementMatches(Tournament $tournament, &$brackets, &$enrollments, $lastBracketIncompleteMatchCount)
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

        if ($lastBracketIncompleteMatchCount > 0) {
            $optimalMatchCount = $lastBracketIncompleteMatchCount;
            $optimalTeamCount = $optimalMatchCount * 2;
        } else {
            $optimalTeamCount = $this->next_pow($teamCount) / 2;
            $optimalMatchCount = $optimalTeamCount / 2;
        }

        $teamDifference = $teamCount - $optimalTeamCount;
        $possibleConnections = floor($teamDifference / 2);

        $completeMatchCount = $optimalMatchCount - $possibleConnections;
        $incompleteMatchCount = min($optimalMatchCount - $completeMatchCount, $optimalMatchCount);

        while ($this->calculatePossibleConnections($teamCount, $completeMatchCount, $incompleteMatchCount) > $incompleteMatchCount && $completeMatchCount > 0) {
            $completeMatchCount--;
            $incompleteMatchCount++;
        }

        while ($this->calculatePossibleConnections($teamCount, $completeMatchCount, $incompleteMatchCount) < $incompleteMatchCount && $incompleteMatchCount > 0) {
            $completeMatchCount++;
            $incompleteMatchCount--;
        }


//        if ($teamCount != 19) {
//            dd([
//                'teams' => $teamCount,
//                'optimal teams' => $optimalTeamCount,
//                'optimal match' => $optimalMatchCount,
//                'diff' => $teamDifference,
//                'complete matches' => $completeMatchCount,
//                'incomplete matches' => $incompleteMatchCount,
//                'possible connections' => $this->calculatePossibleConnections($teamCount, $completeMatchCount, $incompleteMatchCount)
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

        $this->generatePlacementMatches($tournament, $brackets, $enrollments, $incompleteMatchCount);

        array_push($brackets, $bracket);
    }

    private function calculatePossibleConnections($teamCount, $completes, $partials) {
        $takenTeams =$completes*2 + $partials;
        $remainingTeams = $teamCount-$takenTeams;
        return $remainingTeams / 2;
    }

    public function connectMatches($brackets)
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

    public function removeOpponentRecursive(Match $match, $opponents) {
        if ($match->parentMatch == null) return;

        foreach ($opponents as $opponent) {
            $opponentInParent = $match->parentMatch->opponents->where('team_id', $opponent->team_id)->first();
            $this->removeOpponentRecursive($match->parentMatch, $match->parentMatch->opponents);

            if ($opponentInParent == null) continue;
            $opponentInParent->delete();

            if ($match->parentMatch != null) $this->removeOpponentRecursive($match->parentMatch, $opponents);
        }
    }

    public function onResultsUpdated(Match $match)
    {
        $highscore = 0;
        $highscore_team = null;

        foreach ($match->opponents as $opponent) {
            $score = $opponent->result->score;

            if ($score > $highscore) {
                $highscore = $score;
                $highscore_team =$opponent->team;
            } elseif ($highscore_team != null && $score == $highscore) {
                return response('Cannot have equal scores, there needs to be a winner', 400);
            }
        }

        if ($match->parentMatch == null) return Response::HTTP_OK; // Last match

        $this->removeOpponentRecursive($match, $match->opponents);

        $opponent = new Opponent(['team_id' => $highscore_team->id]);
        $match->parentMatch->opponents()->save($opponent);
        $opponent->result()->save(new Result(['score' => 0]));

        return Response::HTTP_OK;
    }
}