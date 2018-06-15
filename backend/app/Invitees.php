<?php

namespace App;


use Illuminate\Database\Eloquent\Model;


class Invitees extends Model
{
    protected $table = 'invitees';
    protected $fillable = ['tournament_id','team_id'];
}