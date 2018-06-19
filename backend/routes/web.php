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
            $router->post('invite', 'TournamentController@invite');
            $router->post('acceptinvite', 'TournamentController@acceptInvite');
            $router->get('enroll/{tournamentId}/{teamId}', 'TournamentController@enroll');   
            $router->post('score', 'TournamentController@storeScore');
            $router->get('all', 'TournamentController@getAll');
            $router->get('get/{id}', 'TournamentController@get');
            $router->get('names', 'TournamentController@getNames');
            $router->get('matchmake/{id}', 'TournamentController@runMatchmaker');
        });

    });

    /**
     * Routes you don't need to be logged on for.
     */
    $router->post('/login', 'UserController@login');
    $router->post('/users/register', 'UserController@register');
});

