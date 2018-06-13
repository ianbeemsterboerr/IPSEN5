<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 30/05/2018
 * Time: 14:22
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $table = 'enrollment';
    protected $fillable = ['tournament_id', 'team_id', 'poule_id'];

    function team() {
        return $this->hasOne('App\Team', 'id', 'team_id');
    }

    function tournament() {
        return $this->belongsTo('App\Tournament');
    }
}