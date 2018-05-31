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

namespace App\Http\Controllers;


$router->group(['prefix' => 'api'], function () use ($router) {
    /**
     * All routes that you need to be logged on for.
     */
    $router->group(['middleware' => 'auth'], function () use ($router) {

        $router->group(['prefix' => 'users'], function () use ($router) {

            $router->get('all', 'UserController@getAll');
            $router->get('allNames', 'UserController@getUserNames');
            $router->get('get/{id}', 'UserController@get');

        });


        $router->group(['prefix' => 'tournament'], function () use ($router) {
            $router->post('new', 'TournamentController@createTournament');
        });

    });

    /**
     * Routes you don't need to be logged on for.
     */
    $router->post('/login', 'UserController@login');
    $router->post('/users/register', 'UserController@register');


    /**
     * Testing routes (unsafe).
     */
    $router->group(['prefix' => 'users'], function () use ($router) {
        $router->get('getusersunsafe', 'UserController@getAll');
        $router->get('allNamesUnsave', 'UserController@getUserNames');
        $router->get('getUnsafe/{id}', 'UserController@get');
    });
    $router->group(['prefix' => 'tournament'], function () use ($router) {
        $router->get('all', 'TournamentController@getAll');
        $router->get('get/{id}', 'TournamentController@get');
        $router->get('dummy', 'TournamentController@createDummyTournament');
        $router->get('names', 'TournamentController@getNames');
    });
});

