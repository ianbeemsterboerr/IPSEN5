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

    public function opponents() {
        return $this->hasMany('App\Opponent');
    }

    public function parentMatch() {
        return $this->hasOne('App\Match', 'id', 'parent_match_id');
    }

    public function childMatches() {
        return $this->hasMany('App\Match', 'parent_match_id', 'id');
    }

    public function tournament() {
        return $this->belongsTo('App\Tournament');
    }

    public function special() {
        return $this->hasOne('App\Match_special', 'match_id');
    }
}