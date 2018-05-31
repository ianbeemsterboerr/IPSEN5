<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 31/05/2018
 * Time: 15:00
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Opponent extends Model
{
    protected $table = 'opponent';
    protected $fillable = ['match_id', 'team_id'];

    public function match() {
        return $this->belongsTo('App\Match');
    }

    public function team() {
        return $this->hasOne('App\Team');
    }
}