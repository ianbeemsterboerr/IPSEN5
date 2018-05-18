<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 17/05/2018
 * Time: 18:41
 */

namespace App;


class Tournament
{
    public $brackets = [];

    public function __construct($teamCount)
    {

    }

    public function serialize()
    {
        return get_object_vars($this);
    }
}