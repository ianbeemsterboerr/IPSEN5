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
class Match_special extends Model
{
    protected $table = 'match_special';
    protected $fillable = ['match_id', 'data'];



    public function match() {
        return $this->belongsTo('App\Match', 'id', 'match_id');
    }

//    public function data() {
//        return $this->hasOne('App\Match_special', 'id', 'data');
//    }



}