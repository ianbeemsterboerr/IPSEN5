<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 18/05/2018
 * Time: 10:17
 */

namespace App;


class Team
{
    public $players;
    public $name;

    /**
     * Team constructor.
     * @param $players
     * @param $name
     */
    public function __construct($players, $name)
    {
        $this->players = $players;
        $this->name = $name;
    }


}