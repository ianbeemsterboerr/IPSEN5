<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 18/05/2018
 * Time: 11:10
 */

namespace App;


class Bracket
{
    public $matches = [];

    /**
     * Bracket constructor.
     * @param array $matches
     */
    public function __construct(array $matches)
    {
        $this->matches = $matches;
    }


}