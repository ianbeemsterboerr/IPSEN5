<?php

namespace App\Http\Controllers;

use App\Tournament;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Team;
use App\User;


class TeamController extends Controller
{
    public function getUsersTeamId(int $id)
    {
        $user = User::find($id);
        $teamName = $user->username;
        $team = Team::where('name', $teamName)->first();
        return $team->id;
    }

    public function getAllWithSize(int $size){
        return Team::where('size', $size)->get();
    }
    
    public function getAll()
    {
        return Team::all();
    }

    public function getAllowedTeams(int $tournament_id)
    {
        return Team::all()
            ->filter(
                function (Team $team) use ($tournament_id) {
                    $tournament = Tournament::find($tournament_id);
                    return $team->canParticipate($tournament) && $team->max_size == $tournament->max_team_size;
                }
            );
    }

    public function getAllowedTeamsByUser(Request $request, int $tournament_id) {
        $user_id = $request->user()->id;
        $teams = $this->getAllowedTeams($tournament_id)->filter(
            function (Team $team) use ($user_id) {
                return $team->leader_user_id == $user_id;
            }
        );
        return $teams->values();
    }
}