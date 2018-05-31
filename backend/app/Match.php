<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 18/05/2018
 * Time: 10:14
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

/**
 * App\Match
 *
 * @mixin \Eloquent
 */
class Match extends Model
{
    protected $table = 'match';
    protected $fillable = ['parent_match_id', 'tournament_id'];

    public function results() {
        return $this->hasMany('App\Result');
    }

    public function parentMatch() {
        return $this->hasOne('App\Match', 'id', 'parent_match_id');
    }

    public function tournamnt() {
        return $this->belongsTo('App\Tournament');
    }
}