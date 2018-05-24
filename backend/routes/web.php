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

use Illuminate\Http\Request;



$router->group(['prefix' => 'api'], function () use ($router) {
    /**
     * All routes that you need to be logged on for.
     */
    $router->group(['middleware' => 'auth'], function () use ($router) {

        $router->group(['prefix' => 'users'], function () use ($router) {

            $router->get('all', 'UserController@getAll');
            $router->get('get/{id}', 'UserController@get');
            
        });



        $router->group(['prefix' => 'tournaments'], function () use ($router) {

        });

    });

    /**
     * Routes you don't need to be logged on for.
     */
    $router->post('/login', 'UserController@login');


    /**
     * Testing routes (unsafe).
     */
    $router->group(['prefix' => 'users'], function () use ($router) {
        $router->get('getusersunsafe', 'UserController@getAll');
    });
    $router->group(['prefix' => 'tournament'], function () use ($router) {
        $router->get('dummy', 'TournamentController@createDummyTournament');
        $router->post('new', 'TournamentController@createTournament');
    });
});

$router->post('/results', function (Request $request) use ($router){
    $results = '';
    $results .= $request->get('tournamentId');
    $results .= $request->get('team1Name');
    $results .= $request->get('team1Score');
    $results .= $request->get('team2Name');
    $results .= $request->get('team2Score');

    return 'test';
});

$router->group(['prefix' => 'results'], function () use ($router) {
        $router->post('new', 'ResultsController@createResults');
    });

?>
