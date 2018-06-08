<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MatchOpponent extends Model
{
    protected $table = 'opponent';

    protected $fillable = [
        'match_id', 'team_id'
    ];
    
    //
}
?>