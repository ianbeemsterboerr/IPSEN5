<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;


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

$router->post('/results', function (Request $request) use ($router){
    $results = '';
    $results .= $request->get('tournamentId');
    $results .= $request->get('team1Name');
    $results .= $request->get('team1Score');
    $results .= $request->get('team2Name');
    $results .= $request->get('team2Score');

    return $results;
});

$router->group(['prefix' => 'results'], function () use ($router) {
        $router->post('new', 'ResultsController@createResults');
    });