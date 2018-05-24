<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 17/05/2018
 * Time: 18:41
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    protected $table = 'tournaments';
    protected $fillable = [
        'organizer_userID', 'gamename', 'tournament_typename', 'signup_typename', 'name', 'description', 'max_team_size', 'signup_start', 'signup_end', 'tournament_start'
    ];

    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    public $matchCounter = 0;


    public $teams;
    public $brackets = [];

    private $placeholderTeam;

    public function start()
    {
        shuffle($this->teams);

        $this->generatePlacementMatches($this->brackets, $this->teams);
        $this->connectMatches(); //todo: sibling on client
        $this->generateMatches($this->brackets);
    }

    private function generateMatches(&$brackets)
    {
        $teamCount = $this->next_pow(count($this->teams)) / 2;
        $bracketCount = log($teamCount, 2);

        for ($i = 0; $i < $bracketCount - 1; $i++) {
            $lastBracket = end($brackets);

            $matchCount = $teamCount / 2 / pow(2, $i + 1);
            $bracket = new Bracket([]);

            for ($a = 0; $a < $matchCount; $a++) {
                $match = new Match([$this->placeholderTeam, $this->placeholderTeam], $this);

                $match->connect($lastBracket->matches[$a * 2]);
                $match->connect($lastBracket->matches[$a * 2 + 1]);

                array_push($bracket->matches, $match);
            }

            array_push($brackets, $bracket);
        }
    }

    private function generatePlacementMatches(&$brackets, $teams)
    {
        $teamCount = count($teams);

        if ($this->is_pow($teamCount)) {
            // No placement matches required

            $bracket = new Bracket([]);
            for ($i = 0; $i < $teamCount / 2; $i++) {
                array_push($bracket->matches, new Match([$teams[$i * 2], $teams[$i * 2 + 1]], $this));
            }

            array_push($this->brackets, $bracket);

            return;
        }

        // Placement matches are required
        $optimalTeamCount = $this->next_pow($teamCount) / 2;
        $optimalMatchCount = $optimalTeamCount / 2;
        $difference = $teamCount - $optimalTeamCount;

        // amount of matches with 2 teams playing against each other
        $completeMatchCount = $optimalMatchCount - $difference;

        // amount of matches with one undetermined opponent
        $incompleteMatchCount = min($optimalMatchCount - $completeMatchCount, $optimalMatchCount);

        // make bracket and add x complete matches
        $bracket = new Bracket($this->makeXMatches($teams, $completeMatchCount));

        // Add the incomplete matches
        for ($i = 0; $i < $incompleteMatchCount; $i++) {
            $match = new Match($this->takeXTeams($teams, 1), $this);
            array_unshift($match->teams, $this->placeholderTeam);
            array_push($bracket->matches, $match);
        }

        $this->generatePlacementMatches($brackets, $teams);

        array_push($brackets, $bracket);
    }

    private function placeholderCount(Match $match)
    {
        $count = 0;

        foreach ($match->teams as $team) {
            if ($team == $this->placeholderTeam) {
                $count++;
            }
        }

        return $count;
    }

    private function connectMatches()
    {
        /* @var $bracket Bracket */
        foreach ($this->brackets as $key => $bracket) {
            // No need to connect the last match, the fact that it has no connection makes it detectable as last match
            if ($bracket == end($this->brackets)) {
                break;
            }

            $nextBracket = $this->brackets[++$key];

            /* @var $match Match */
            foreach ($bracket->matches as $match) {
                /* @var $nextMatch Match */
                foreach ($nextBracket->matches as $nextMatch) {
                    $spots = 2 - count($nextMatch->teams) - count($nextMatch->previousMatches) + $this->placeholderCount($nextMatch);
                    if ($spots > 0) {
                        //Spot available here
                        $nextMatch->connect($match);

                        break;
                    }
                }
            }
        }
    }

    private function takeXTeams(&$teams, $amount)
    {
        $takenTeams = [];

        for ($i = 0; $i < $amount; $i++) {
            array_push($takenTeams, array_pop($teams));
        }

        return $takenTeams;
    }

    private function makeXMatches(&$teams, $amount)
    {
        $matchTeams = $this->takeXTeams($teams, $amount * 2);

        $matches = [];

        for ($i = 0; $i < $amount; $i++) {
            array_push($matches, new Match([$matchTeams[$i * 2], $matchTeams[$i * 2 + 1]], $this));
        }

        return $matches;
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

    public function getMatchID()
    {
        return ++$this->matchCounter;
    }

    public function serialize()
    {
        return get_object_vars($this);
    }
}