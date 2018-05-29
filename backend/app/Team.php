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
    protected $fillable = ['leader_userID', 'size', 'max_size'];
    protected $table = 'Team';
}