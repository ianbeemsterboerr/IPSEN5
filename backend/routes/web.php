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


$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('/joke', function (Request $request) use ($router) {
    $joke = "Which pet makes the most noise? A trumpet.";


    $results = \DB::select("SELECT * FROM tournament");

    $input = $request->all();
    echo implode(" ", $input);

    var_dump($results);

    return $joke;
});

$router->post('/tournament', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'tournament'], function () use ($router) {
    $router->get('dummy', 'TournamentController@createDummyTournament');
    $router->post('new', 'TournamentController@createTournament');
});