<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use App\Team;
use App\User;


class TeamController extends Controller
{
    public function getUsersTeamId(int $id){
        $user = User::find($id);
        $teamName = $user->username;
        $team = Team::where('name', $teamName)->first();
        return $team->id;
    }

    public function getAll(int $size){
        return Team::where('size', $size)->get();
    }
}