<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 17/05/2018
 * Time: 13:17
 */

namespace App\Http\Controllers;


use App\Team;
use App\Invitees;
use Illuminate\Http\Request;
use App\Tournament;
use Mailgun\Mailgun;
use App\Result;
use App\Match;
use Illuminate\Support\Facades\DB;
use App\Enrollment;
use App\User;

use Illuminate\Http\Response;

class TournamentController extends Controller
{
    public function getAll() {
        return Tournament::all();
    }

    public function get(int $id) {
        return Tournament::with(
            [
                'enrollments.team.teamMembers.user',
                'enrollments.team.teamLeader',
                'matches.opponents.team',
                'matches.opponents.result',
                'organiser'
            ]
        )->find($id);
    }

    public function getMatchOverview(int $id) {
        return (string) Tournament::with(['matches.opponents.team'])->find($id);
    }

    public function getNames(Request $request){
        return Tournament::all(['name']);
    }

    public function createTournament(Request $request) {
        $tournament = new Tournament();
        $tournament->fill($request->json()->all());
        $tournament->organizer_user_id = $request->user()->id;
        $tournament->save();

        return Response::HTTP_OK;
    }

    public function runMatchmaker(int $id) {
        $tournament = Tournament::find($id);

        //todo: Look for duplicate players
        $teamMember_count = DB::table('team_member')
            ->select('user_id', DB::raw('count(*) as times_participating'))
            ->groupBy('user_id')
            ->join('enrollment', 'team_member.team_id', '=', 'enrollment.team_id')
            ->where('enrollment.tournament_id', '=', $tournament->id)
            ->having('times_participating', '>', 1)->get();

        if ($teamMember_count->count() > 0) {
            $message = "Could not start match, one or more users is participating in multiple teams:\n";
            foreach ($teamMember_count as $conflict) {
                $user = User::find($conflict->user_id);

                $message .= $user->username . ' is part of ' . $conflict->times_participating . " teams\n";
            }

            return response($message,400);
        }


        $controller = TournamentFactory::getTournamentController($tournament);
        $controller->runMatchmaker($tournament);
    }

    public function invite(Request $request){
        $tournament = Tournament::where('id', $request->json()->get('tournamentId'))->first();
        $inviterUserId = $request->user()->id;
        $inviteeTeamId = $request->json()->get('teamId');

        if(!$tournament->organizer_user_id === $inviterUserId){
            return response()->json(array(
                'status' => 'error',
                'message' => 'User not authorized to invite for this tournament.'
            ), 401);
        }

        if(Team::where('id', $inviteeTeamId)->count() < 1){
            return response('User or team not found', 404);
        }
        //get userId as described in JWT, instead of client sending id in request.

        //flawed query:
        if(Invitees::where('team_id', $inviteeTeamId)->where('tournament_id',$tournament->id)->count() > 0){
            return response()->json(array(
                'status' => 'error',
                'message' => 'User or team already invited.'
            ), 400);
        }

        $invitee = new Invitees;
        $invitee->tournament_id = $tournament->id;
        $invitee->team_id = $inviteeTeamId;
        $invitee->save();

        $tournamentid = $request->json()->get('tournamentId');
        // $mg = Mailgun::create(env('MAILGUN_SECRET'));

        // $linkToFrontend = env('FRONTEND_URL')."/tournaments/invite?tournament={$tournamentid}&user={$inviterUserId}";
        // $mg->messages()->send(env('MAILGUN_DOMAIN'), [
        //     'from'    => 'invites@'.env('MAILGUN_DOMAIN'),
        //     'to'      => //ADD ENV REFERENCE
        //     'subject' => 'The PHP SDK is awesome!',
        //     'text'    => "{$linkToFrontend}"
        //   ]);

          return Team::select('name')->where('id', $inviteeTeamId)->first();
    }

    public function acceptInvite(Request $request){
        //TODO: 
        $inviterUserId = $request->json()->get('userId');
        $tournamentid = $request->json()->get('tournamentId');
        //HANDLE ACCEPT INVITE LOGIC HERE
        enroll();
    }

    public function storeScore(Request $request)
    {
        $matchJSON = $request->json()->all();

        foreach ($matchJSON["opponents"] as $opponent) {
            $resultClient = $opponent["result"];

            $result = Result::find($resultClient["opponent_id"]);
            $result->score = $resultClient["score"];
            $result->save();
        }

        $match = Match::find($matchJSON['id']);

        $controller = TournamentFactory::getTournamentController($match->tournament()->first());
        $controller->onResultsUpdated($match);

        return Response::HTTP_OK;
    }

    public function enroll(int $tournamentId, int $teamId){
        //TODO: check if invitee is on the invitee table in database (to be created)
        $tournament = Tournament::find($tournamentId);
        $enrollment = new Enrollment(['team_id'=>$teamId]);
        $tournament->enrollments()->save($enrollment);
    }

}