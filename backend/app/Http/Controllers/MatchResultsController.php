<?php

namespace App\Http\Controllers;

use App\Result;
use App\Match;
use App\Opponent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class MatchResultsController extends Controller
{
    /**
     * Create a new results instance.
     *
     * @param  Request  $request
     * @return Response
     */


    public function getAll(Request $request)
    {
        return Match::all();
    }
}