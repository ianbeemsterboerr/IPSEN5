<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
$router->group([ 'middleware => cors'], function($router){

    $router->get('/', function () use ($router) {
        return $router->app->version();
    });

    $router->get('/getusersunsafe', 'UserController@getAll');

    $router->post('/testpost', 'UserController@testpost');


    $router->group(['middleware' => 'auth'], function () use ($router) {

        $router->get('/getusers', 'UserController@getAll');
    });

    $router->post('/login', 'UserController@login');
});

