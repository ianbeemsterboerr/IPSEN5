<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;


class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;
    protected $table = 'user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'password', 'email', 'first_name', 'last_name', 'email', 'description', 'avatar_url', 'salt', 'force_pw_change', 'force_name_change', 'guest'
    ];
    protected $visible =[
        'id', 'username', 'first_name', 'last_name', 'description', 'avatar_url',  'guest', 'isadmin'
    ];
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'email', 'salt', 'force_pw_change', 'force_name_change', 'webtoken'
    ];

    public function teams(){
        return $this->hasMany('App\Team','leader_user_id', 'id');
    }

    public function teamMembers() {
        return $this->hasMany('App\TeamMember');
    }
}
