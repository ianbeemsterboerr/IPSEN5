<?php

namespace App\Http\Controllers;

use App\MatchResults;
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

        $team1results = new MatchResults;
        $team2results = new MatchResults;
        
        $team1results->MatchID = $request->MatchId;
        $team2results->MatchID = $request->MatchId;

        $team1results->score = $request->Team1Score;
        $team2results->score = $request->Team2Score;
        
        $team1results->TeamID = $request->Team1Id;
        $team2results->TeamID = $request->Team2Id;

        $team1results->save();
        $team2results->save();
    }

    public function getAll(Request $request)
    {
        return MatchResults::all();
    }
}