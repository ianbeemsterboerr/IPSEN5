import { Component, OnInit } from '@angular/core';
import {ApiService} from '../shared/api.service';
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
  team1Id = '1';
  team2Id = '2';

 

  constructor(private api: ApiService) { }

  ngOnInit() {  
  }

  

  setNames(player1, player2){
    this.player1Name = player1;
    this.player2Name = player2;
  }

  sendResults(){    
    const values = document.getElementById('resultForm');
    let results = new HttpParams();
    results = results.append('TournamentId', '0');
    results = results.append('MatchId', '0')
    results = results.append('Team1Id', this.team1Id);
    results = results.append('Team1Score', values[0].value);
    results = results.append('Team2Id', this.team2Id);
    results = results.append('Team2Score', values[1].value);

   //console.log(values[2].value);

   this.api.post('results/new', results).subscribe(res => {
   });
  }

  

}
