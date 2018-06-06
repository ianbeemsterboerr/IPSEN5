import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from '../shared/api.service';
import { Match } from '../shared/model/match';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-match-result',
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.css']
})

export class MatchResultComponent implements OnInit {
  @Input() match: Match;

 

  constructor(private api: ApiService) { }

  ngOnInit() {  
  }

  sendResults(match){    
    //const values = document.getElementById('resultForm');
    //let results = new HttpParams();
    //results = results.append('tournamentId', '0');
    //results = results.append('matchId', '0')
    //results = results.append('team1Id', this.team1Id);
    //results = results.append('team1Score', values[0].value);
    //results = results.append('team2Id', this.team2Id);
    //results = results.append('team2Score', values[1].value);

   //console.log(match);

   this.api.post('tournament/score', match).subscribe(res => {
   });
  }

  

}
