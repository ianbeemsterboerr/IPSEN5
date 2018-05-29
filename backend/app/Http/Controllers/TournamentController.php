<?php
/**
 * Created by PhpStorm.
 * User: Jelle Metzlar
 * Date: 17/05/2018
 * Time: 13:17
 */

namespace App\Http\Controllers;


use App\Team;
use Illuminate\Http\Request;
use App\Tournament;

use PDO;


class TournamentController extends Controller
{


    public function createDummyTournament(Request $request) {
        $team_count = $request->get('teams');
        $teams = [];

//        Generate dummy teams
        for ($i = 0; $i < $team_count; $i++) {
            array_push($teams, new Team(null, 'Team ' . $i));
        }

        $tournament = new Tournament($teams);

        return $tournament->serialize();
    }


    public function getNames(Request $request){


        $results = \DB::select("SELECT * FROM tournaments");

        return json_encode($results);
    }


    public function createTournament(Request $request) {




//        $results = \DB::select("SELECT * FROM tournaments");

        $servername = "127.0.0.1";
        $username = "homestead";
        $password = "secret";
        $database = "homestead";

        $connection = new PDO("mysql:host=$servername;dbname=$database", $username, $password);


        $statement = $connection->prepare("INSERT INTO tournaments (organizer_userID, gamename,
          tournament_typename, signup_typename, name, description, max_team_size, signup_start,
          signup_end, tournament_start) VALUES (:organizer_userID, :gamename,
          :tournament_typename, :signup_typename, :name, :description, :max_team_size, :signup_start,
          :signup_end, :tournament_start)");


        $statement->bindParam(':organizer_userID', $organizer_userID);
        $statement->bindParam(':gamename', $gamename);
        $statement->bindParam(':tournament_typename', $tournament_typename);
        $statement->bindParam(':signup_typename', $signup_typename);
        $statement->bindParam(':name', $name);
        $statement->bindParam(':description', $description);
        $statement->bindParam(':max_team_size', $max_team_size);
        $statement->bindParam(':signup_start', $signup_start);
        $statement->bindParam(':signup_end', $signup_end);
        $statement->bindParam(':tournament_start', $tournament_start);


        $organizer_userID = $request->input('organizer_ID');
        $gamename = $request->input('game');
        $tournament_typename = $request->input('type');;
        $signup_typename = $request->input('signupType');
        $name = $request->input('name');
        $description = $request->input('description');
        $max_team_size = $request->input('teamSize');
        $signup_start = $request->input('signupStart');
        $signup_end = $request->input('signupStart');
        $tournament_start = $request->input('date');

        $statement->execute();

        return json_encode("Tournament submitted.");

    }

}