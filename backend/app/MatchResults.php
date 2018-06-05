<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MatchResults extends Model
{
    protected $table = 'Result';

    protected $fillable = [
        'opponent_id', 'score'
    ];
    
    //
}
?>