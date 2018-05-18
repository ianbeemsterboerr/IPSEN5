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
    public $teams = [];
    public $nextMatch;

    /**
     * Match constructor.
     * @param array $teams
     * @param $nextMatch
     */
    public function __construct(array $teams, $nextMatch)
    {
        $this->teams = $teams;
        $this->nextMatch = $nextMatch;
    }


}