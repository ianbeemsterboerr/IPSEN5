<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 18/05/2018
 * Time: 10:17
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

/**
 * App\Team
 *
 * @mixin \Eloquent
 * @property int $ID
 * @property int $leader_userID
 * @property string $name
 * @property int $size
 * @property int $max_size
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Team whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Team whereID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Team whereLeaderUserID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Team whereMaxSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Team whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Team whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Team whereUpdatedAt($value)
 * @property int $id
 * @property int $leader_user_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Team whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Team whereLeaderUserId($value)
 */
class Team extends Model
{
    protected $table = 'team';
    protected $fillable = ['leader_user_id', 'name', 'size', 'max_size'];

    function teamMembers() {
        return $this->hasMany('App\TeamMember', 'team_id', 'id');
    }

    function teamLeader() {
        return $this->hasOne('App\User', 'id', 'leader_user_id');
    }
}