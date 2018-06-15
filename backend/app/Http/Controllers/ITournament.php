<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 01/06/2018
 * Time: 10:44
 */

namespace App\Http\Controllers;


use App\Tournament;
use App\Match;

interface ITournament
{
    public function runMatchmaker(Tournament $tournament);

    public function onResultsUpdated(Match $match);
}