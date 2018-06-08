<?php
/**
 * Created by PhpStorm.
 * User: Joppe
 * Date: 06-Jun-18
 * Time: 14:28
 */

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testTest()
    {
        $boo = [1, 3, 5];

        $this->assertEquals('AAAAAA', 'AAAAAA');
        $this->assertNotEmpty($boo);


    }
}
