<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 01/06/2018
 * Time: 10:45
 */

namespace App\Http\Controllers;


use App\Http\Controllers\Fifa\EliminationTournament;
use App\Http\Controllers\Fifa\PouleTournament;
use App\Tournament;

class TournamentFactory
{
    private static $controllers = [
        'Fifa' => [
            'Single elimination' => EliminationTournament::class,
            'Poules' => PouleTournament::class
        ]
    ];

    public static function getTournamentController(Tournament $tournament) {
        $controllerClass = TournamentFactory::$controllers[$tournament->gamename][$tournament->tournament_typename];

        return new $controllerClass;
    }
}