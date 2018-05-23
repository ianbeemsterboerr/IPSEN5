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

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->group(['prefix' => 'users'], function () use ($router) {

        $router->group(['middleware' => 'auth'], function () use ($router) {
            $router->get('getusers', 'UserController@getAll');
            $router->get('all', 'UserController@getAll');
        });
    });

    $router->post('/login', 'UserController@login');

    $router->group(['prefix' => 'tournament'], function () use ($router) {
        $router->get('dummy', 'TournamentController@createDummyTournament');
    });
});
