<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 17/05/2018
 * Time: 13:17
 */

namespace App\Http\Controllers;


use App\Team;
use Illuminate\Http\Request;
use App\Tournament;

use Illuminate\Http\Response;
use PDO;


class TournamentController extends Controller
{


    public function createDummyTournament(Request $request) {
        $team_count = $request->get('teams');
        $teams = [];

//        Generate dummy teams
        for ($i = 0; $i < $team_count; $i++) {
            array_push($teams, new Team(null, 'Team ' . $i));
        }

        $tournament = new Tournament();
        $tournament->teams = $teams;
        $tournament->start();

        return $tournament->serialize();
    }


    public function getNames(Request $request){
        return Tournament::all(['name']);
    }

    public function getAll() {
        return Tournament::all();
    }


    public function createTournament(Request $request) {
        $tournament = new Tournament();
        $tournament->fill($request->json()->all());
        $tournament->organizer_user_id = $request->user()->id;
        $tournament->save();

        return Response::HTTP_OK;
    }

}