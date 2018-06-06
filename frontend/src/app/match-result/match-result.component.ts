import {Component, OnInit, Input} from '@angular/core';
import {ApiService} from '../shared/api.service';
import { Match } from '../shared/model/match';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-match-result',
  templateUrl: './match-result.component.html'
})

export class MatchResultComponent implements OnInit {
  @Input() match: Match;

 

  constructor(private api: ApiService) { }

  ngOnInit() {  
  }

  sendResults(match){
    this.api.post('tournament/score', match).subscribe(res => {
   });
  }

  

}
