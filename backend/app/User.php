<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

/**
 * App\User
 *
 * @mixin \Eloquent
 * @property int $user_id
 * @property string $user_username
 * @property string $user_first_name
 * @property string $user_last_name
 * @property string $user_email
 * @property string $user_description
 * @property string $user_avatar_url
 * @property string $user_salt
 * @property string $user_password
 * @property int $user_force_pw_change
 * @property int $user_force_name_change
 * @property int $user_guest
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string $user_webtoken
 * @property int $user_isadmin
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserAvatarUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserForceNameChange($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserForcePwChange($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserGuest($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserIsadmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserPassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserSalt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUserWebtoken($value)
 * @property int $id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereId($value)
 */
class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;
    protected $table = 'user';
//    protected $primaryKey = 'id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_password', 'user_username', 'user_email', 'user_first_name', 'user_last_name', 'user_email', 'user_description', 'user_avatar_url', 'user_salt', 'user_force_pw_change', 'user_force_name_change', 'user_guest', 'user_webtoken', 'user_isadmin'
    ];
    protected $visible =[
        'id', 'user_username', 'user_email', 'user_first_name', 'user_last_name', 'user_email', 'user_description', 'user_avatar_url', 'user_salt', 'user_force_pw_change', 'user_force_name_change', 'user_guest', 'user_webtoken', 'user_isadmin'
    ];
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        
    ];
}
