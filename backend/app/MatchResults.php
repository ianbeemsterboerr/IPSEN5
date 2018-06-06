<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MatchResults extends Model
{
    protected $table = 'result';

    protected $fillable = [
        'opponent_id', 'score'
    ];
    
    //
}
?>