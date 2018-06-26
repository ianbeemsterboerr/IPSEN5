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
            $router->get('all', 'TournamentController@getAll');
            $router->get('get/{id}', 'TournamentController@get');
            $router->get('names', 'TournamentController@getNames');
            $router->get('matchmake/{id}', 'TournamentController@runMatchmaker');
            $router->get('invitedfor/{userId}', 'TournamentController@getAllInvitedFor');
            $router->get('enroll/{tournamentId}/{teamId}', 'TournamentController@enroll');   
            $router->get('unEnroll/{tournamentId}/{teamId}', 'TournamentController@unEnroll');

            $router->post('new', 'TournamentController@createTournament');
            $router->post('invite', 'TournamentController@invite');
            $router->post('acceptinvite', 'TournamentController@acceptInvite');
            $router->post('score', 'TournamentController@storeScore');
        });

        $router->group(['prefix' => 'teams'], function () use ($router) {
            $router->get('remove/{id}', 'TeamController@remove');
            $router->get('getidbyuserid/{id}', 'TeamController@getUsersTeamId');
            $router->get('withUser/{user_id}', 'TeamController@participating');
            $router->get('qualifying/{tournament_id}', 'TeamController@getQualifyingTeams');
            $router->get('all/{size}', 'TeamController@getAllWithSize');
            $router->get('all', 'TeamController@getall');
            $router->get('getteamsofuser', 'TeamController@getTeamsOfUser');



            $router->post('new', 'TeamController@register');
            $router->post('newMember/{teamid}', 'TeamController@registerMember');
        });

        


    });

    /**
     * Routes you don't need to be logged on for.
     */
    $router->post('/login', 'UserController@login');
    $router->post('/users/register', 'UserController@register');
    $router->get('teams/getteammembers/{id}', 'TeamController@getTeamMembers');
});

