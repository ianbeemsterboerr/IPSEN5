<?php

namespace App\Http\Controllers;

use App\Tournament;
use Illuminate\Http\Response;
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
}