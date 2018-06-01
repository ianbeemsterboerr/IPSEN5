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
    public function get(int $id) {
        return (string) Tournament::with(['enrollments.team.teamMembers.user', 'enrollments.team.teamLeader', 'organiser'])->find($id);
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