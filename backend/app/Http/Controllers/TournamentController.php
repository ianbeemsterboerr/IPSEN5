<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 17/05/2018
 * Time: 13:17
 */

namespace App\Http\Controllers;


use Illuminate\Http\Request;

class TournamentController extends Controller
{
    public function createDummyTournament(Request $request) {
        $team_count = $request->get('teams');
        return ($team_count);
    }
}