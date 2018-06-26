<?php

namespace App\Http\Controllers;

use App\Tournament;
use Illuminate\Http\Request;
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

    public function getAllWithSize(int $size){
        return Team::where('size', $size)->get();
    }
    
    public function getAll()
    {
        return Team::all();
    }

    public function participating(int $user_id) {
        return User::find($user_id)->participatingTeams()->with([
            'teamMembers.user',
            'teamLeader'
        ])->get()->all();
    }

    public function getQualifyingTeams(int $tournament_id)
    {
        return Team::all()
            ->filter(
                function (Team $team) use ($tournament_id) {
                    $tournament = Tournament::find($tournament_id);
                    return $team->canParticipate($tournament);
                }
            )->values();
    }

    public function register(Request $request) {
        if (Team::whereName($request->get('name'))->first() != null)
            return response('Team name already in use', 409);

        $team = new Team($request->all());
        $team->leader_user_id = $request->user()->id;
        $team->save();

        $team->teamMembers()->create(['user_id' => $request->user()->id]);

        return $team;
    }

    public function registerMember(Request $request, int $team_id) {
        $team = Team::find($team_id);

        if ($team == null)
            return response('Cannot register member, team does not exist.', 400);

        if ($team->leader_user_id != $request->user()->id)
            return response('Cannot register member to a team that is not yours.', 400);

        if ($team->teamMembers()->count() >= $team->max_size)
            return Response('Team is full', 400);

        $user = User::find($request->get('user_id'));
        if ($user == null)
            return response('Cannot register unknown user', 400);

        $team->teamMembers()->create(['user_id' => $user->id]);

        return Response::HTTP_OK;
    }
}