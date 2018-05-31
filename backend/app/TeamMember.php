<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 30/05/2018
 * Time: 11:54
 */

namespace App;


use Illuminate\Database\Eloquent\Model;


class TeamMember extends Model
{
    protected $table = 'team_member';
    protected $fillable = ['user_id', 'team_id', 'size', 'max_size'];

    function user() {
        return $this->hasOne('App\User');
    }

    function team() {
        return $this->belongsTo('App\Team');
    }
}