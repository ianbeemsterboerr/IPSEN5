<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 30/05/2018
 * Time: 11:54
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

/**
 * App\TeamMember
 *
 * @property int $user_id
 * @property int $team_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TeamMember whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TeamMember whereTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TeamMember whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TeamMember whereUserId($value)
 * @mixin \Eloquent
 */
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