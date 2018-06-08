<?php
/**
 * Created by PhpStorm.
 * User: Joppe
 * Date: 06-Jun-18
 * Time: 14:52
 */

class TournamentControllerTest extends TestCase
{

    public function testExample()
    {
        $this->get('/');

        $this->assertEquals(
            $this->app->version(), $this->response->getContent()
        );
    }
}