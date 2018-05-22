<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 18/05/2018
 * Time: 10:14
 */

namespace App;


class Match
{
    public $matchID;
    public $teams = [];
    public $nextMatch;
    public $previousMatches = [];

    /**
     * Match constructor.
     * @param array $teams
     * @param Tournament $tournament
     */
    public function __construct(array $teams, Tournament $tournament)
    {
        $this->teams = $teams;
        $this->matchID = $tournament->getMatchID();
    }

    public function connect(Match &$other) {
        array_push($this->previousMatches, $other->matchID);
        $other->nextMatch = $this->matchID;
    }
}