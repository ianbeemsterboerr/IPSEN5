<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MatchResults extends Model
{
    protected $table = 'Result';
    //protected $matchTable = 'Match';
    //protected $opponentTable = 'Opponent';

    protected $fillable = [
        'score', 'MatchID', 'TeamID'
    ];
    
    //
}
?>