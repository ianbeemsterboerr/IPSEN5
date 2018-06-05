<?php

namespace App\Http\Controllers;

use App\MatchResults;
use App\MatchOpponent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MatchResultsController extends Controller
{
    /**
     * Create a new results instance.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        // Validate the request...        
        $this->insertResults($this->insertOpponent($request->matchId, $request->team1Id), $request->Team1Score);
        $this->insertResults($this->insertOpponent($request->matchId, $request->team2Id), $request->Team2Score);

    }

    public function insertOpponent($matchId, $teamId){
        $teamOpponent = new MatchOpponent;

        $teamOpponent->match_id = $matchId;

        $teamOpponent->team_id = $teamId;

        $teamOpponent->save();

        return $teamOpponent->id;

    }

    public function insertResults($opponent_id, $score){
        $teamResults = new MatchResults;

        $teamResults->opponent_id = $opponent_id;

        $teamResults->score = $score;
       
        $teamResults->save();
    }

    public function getAll(Request $request)
    {
        return MatchResults::all();
    }
}