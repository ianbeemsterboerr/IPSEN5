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
    console.log('Submitting tournament: ' + values[0].value)
  }

}
