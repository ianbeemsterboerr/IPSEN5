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
use App\Enrollment;
use App\Tournament;
use Mailgun\Mailgun;
use App\Result;
use App\Match;
use App\Opponent;
use App\Http\Controllers\Controller;
use App\Enrollment;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use PDO;


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

        $controller = TournamentFactory::getTournamentController($tournament);
        $controller->runMatchmaker($tournament);
    }

    public function invite(Request $request){
        $userid = $request->json()->get('userId');
        $tournamentid = $request->json()->get('tournamentId');
        //HANDLE INVITE LOGIC HERE
        $mg = Mailgun::create(env('MAILGUN_SECRET'));

        $linkToFrontend = env('FRONTEND_URL')."tournaments/invite?tournament={$tournamentid}&user={$userid}";
        $mg->messages()->send(env('MAILGUN_DOMAIN'), [
            'from'    => 'invites@'.env('MAILGUN_DOMAIN'),
            'to'      => 'jelle.metzlar@outlook.com',
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
        foreach ($request->json()->all()["opponents"] as $opponent) {
            $resultClient = $opponent["result"];

            $result = Result::find($resultClient["opponent_id"]);
            $result->score = $resultClient["score"];
            $result->save();
        }   
        return Response::HTTP_OK;
    }

    public function checkEnrollment(request $request){
        $user_id = 5051;
        foreach($request->json()->all()['enrollments'] as $team){
            if($team['team']['leader_user_id'] == $user_id){
                return "user found";
            }
        }
        //newEnrollment(10,1,1);
    }

    public function checkTeam(){
        return false;
    }

    public function newEnrollment($user_id, $tournament_id, $team_size) {
        $team_results = DB::table('team')->where([
            ['leader_user_id', $user_id],
            ['Max_size', $max_size]])->first();

        $enrollment = new Enrollment();
        $enrollment->fill([
            'tournament_id' => $tournament_id,
            'team_id' => $team_results->id
        ]);

        $enrollment->save();
        return Response::HTTP_OK;
    }

    public function enroll(int $tournamentId, int $teamId){
        $tournament = Tournament::find($tournamentId);
        $enrollment = new Enrollment(['team_id'=>$teamId]);
        $tournament->enrollments()->save($enrollment);
    }

}