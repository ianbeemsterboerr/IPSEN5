<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 01/06/2018
 * Time: 10:44
 */

namespace App\Http\Controllers;


use App\Tournament;

interface ITournament
{
    public function runMatchmaker(Tournament $tournament);
}