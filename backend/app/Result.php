<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 31/05/2018
 * Time: 14:46
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    protected $table = 'result';
    protected $primaryKey = 'opponent_id';
    protected $fillable = ['score', 'opponent_id'];

    public function opponent() {
        return $this->belongsTo('App\Opponent');
    }
}