<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 18/05/2018
 * Time: 10:17
 */

namespace App;


use Illuminate\Database\Eloquent\Model;


class Team extends Model
{
    protected $table = 'team';
    protected $fillable = ['leader_user_id', 'name', 'size', 'max_size'];

    function teamMembers() {
        return $this->hasMany('App\TeamMember', 'team_id', 'id');
    }

    function memberCount() {
        return $this->teamMembers()->count();
    }

    function teamLeader() {
        return $this->hasOne('App\User', 'id', 'leader_user_id');
    }

    public function canParticipate(Tournament $tournament) {
        if ($this->max_size != $tournament->max_team_size)
            return false;

        foreach ($this->teamMembers as $teamMember)
            if ($teamMember->user->isParticipating($tournament))
                return false;

        return true;
    }
}