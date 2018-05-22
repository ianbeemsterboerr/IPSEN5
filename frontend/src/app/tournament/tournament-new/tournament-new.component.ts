import { Component, OnInit } from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Params} from '@angular/router';

@Component({
  selector: 'app-tournament-new',
  templateUrl: './tournament-new.component.html',
  styleUrls: ['./tournament-new.component.css']
})
export class TournamentNewComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  submitForm() {
    const values = document.getElementById('form');
    console.log('Submitting  tournament: ' + values[0].value);

    let Params = new HttpParams();
    Params = Params.append('name', values[0].value);
    Params = Params.append('date', values[1].value);
    Params = Params.append('type', values[2].value);
    Params = Params.append('teamSize', values[3].value);
    Params = Params.append('signupType', values[4].value);
    Params = Params.append('signupStart', values[5].value);
    Params = Params.append('signupEnd', values[6].value);
    Params = Params.append('description', values[7].value);

    this.http.post('http://localhost:8080/api/tournament/new', Params, {responseType: 'text'}).subscribe(res => {
      console.log(res);
    });
  }

}
