<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 17/05/2018
 * Time: 18:41
 */

namespace App;


use Illuminate\Database\Eloquent\Model;


class Tournament extends Model
{
    protected $table = 'tournament';
    protected $fillable = [
        'organizer_user_id', 'gamename', 'tournament_typename', 'signup_typename', 'name', 'description', 'max_team_size', 'signup_start', 'signup_end', 'tournament_start'
    ];

    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    public function enrollments() {
        return $this->hasMany('App\Enrollment');
    }

    public function matches() {
        return $this->hasMany('App\Match');
    }

    public function organiser() {
        return $this->hasOne('App\User', 'id', 'organizer_user_id');
    }
}