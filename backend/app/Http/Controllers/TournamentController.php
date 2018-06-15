<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 17/05/2018
 * Time: 13:17
 */

namespace App\Http\Controllers;


use App\User;
use Illuminate\Http\Request;
use App\Tournament;
use Mailgun\Mailgun;
use App\Result;
use App\Match;
use Illuminate\Support\Facades\DB;
use App\Enrollment;

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
        $userid = $request->json()->get('userId');
        $tournamentid = $request->json()->get('tournamentId');
        //HANDLE INVITE LOGIC HERE
        $mg = Mailgun::create(env('MAILGUN_SECRET'));

        $linkToFrontend = env('FRONTEND_URL')."/tournaments/invite?tournament={$tournamentid}&user={$userid}";
        $mg->messages()->send(env('MAILGUN_DOMAIN'), [
            'from'    => 'invites@'.env('MAILGUN_DOMAIN'),
            'to'      => env('MAIL_TARGET'),
            'subject' => 'The PHP SDK is awesome!',
            'text'    => "{$linkToFrontend}"
          ]);
    }

    public function acceptInvite(Request $request){
        $userid = $request->json()->get('userId');
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
        $tournament = Tournament::find($tournamentId);
        $enrollment = new Enrollment(['team_id'=>$teamId]);
        $tournament->enrollments()->save($enrollment);
    }

}