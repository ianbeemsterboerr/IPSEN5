<?php
namespace App\Http\Controllers;
use App\Team;
use Illuminate\Http\Request;
use PDO;

class TournamentController extends Controller
{

    public function createResults(Request $request) {
        $servername = "127.0.0.1";
        $username = "";
        $password = "";
        $database = "";

        $connection = new PDO("mysql:host=$servername;dbname=$database", $username, $password);

        $statement = $connection->prepare("INSERT INTO Result (score, matchID,
          TeamID");

        $statement->bindParam(':score', $score);
        $statement->bindParam(':MatchID', $matchID);
        $statement->bindParam(':TeamID', $teamID);
        $statement->execute();
        return json_encode("Results submitted.");
    }
}