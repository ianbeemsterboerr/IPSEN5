<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 31/05/2018
 * Time: 14:46
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    protected $table = 'result';
    protected $fillable = ['match_id', 'team_id', 'score'];

    public function match() {
        return $this->belongsTo('App\Match');
    }

    public function team() {
        return $this->hasOne('App\Team');
    }
}