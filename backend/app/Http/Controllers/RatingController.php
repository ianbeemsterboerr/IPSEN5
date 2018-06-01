<?php

namespace App\Http\Controllers;
require 'Rating.php';
class RatingController extends Controller{
    public function postResults(Request $request){
        $playerIdA = $request->json('playerIdA');
        $playerIdB = $request->json('playerIdB');
        $score = $request->json('score');
        
        abort('$playerIdA $playerIdB $score');
    return null;
    }
}