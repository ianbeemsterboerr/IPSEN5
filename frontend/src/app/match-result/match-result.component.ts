import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-match-result',
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.css']
})

export class MatchResultComponent implements OnInit {
  team1score = 0;
  team2score = 0;
  player1Name = "Default 1";
  player2Name = "Default 2";

 

  constructor(private http: HttpClient) { }

  ngOnInit() {  
  }

  setNames(player1, player2){
    this.player1Name = player1;
    this.player2Name = player2;
  }

  sendResults(){
    let results = new HttpParams();
    results = results.append('TournamentId', '0');
    results = results.append('MatchId', '0')
    results = results.append('Team1Id', 'Bart');
    results = results.append('Team1score','3');
    results = results.append('Team2Id', 'Nart');
    results = results.append('Team2Score','5');

   console.log(results);

    this.http.post('http://localhost:8000/results', results, {responseType: 'text'}).subscribe(res => {
      
    });
  }

  

}
