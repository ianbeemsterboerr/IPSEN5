import { Component, OnInit } from '@angular/core';

import {HttpParams} from '@angular/common/http';
import {Params, Router} from '@angular/router';
import {ApiService} from '../../shared/api.service';
import {GameService} from '../../games/game.service';
import {Tournament} from '../../shared/model/tournament';

@Component({
  selector: 'app-tournament-new',
  templateUrl: './tournament-new.component.html',
  styleUrls: ['./tournament-new.component.css']
})
export class TournamentNewComponent implements OnInit {

  constructor(private api: ApiService, private gameService: GameService, private router: Router) { }

  submitDisabled = true;

  ngOnInit() {
  }
  updateButton() {
    let valid = true;
    const values = document.getElementById('form');
    for (let i = 0; i < values.children.length - 1; i++) {
      if (values[i].value.length === 0) {
        valid = false;
      }
    }

    this.submitDisabled = !valid;
  }
  submitForm() {
    const values = document.getElementById('form');
    console.log('Submitting tournament: ' + values[0].value);


    let params = new HttpParams();
    params = params.append('name', values[0].value);
    params = params.append('date', values[1].value);
    params = params.append('type', values[2].value);
    params = params.append('teamSize', values[3].value);
    params = params.append('signupType', values[4].value);
    params = params.append('signupStart', values[5].value);
    params = params.append('signupEnd', values[6].value);
    params = params.append('description', values[7].value);
    params = params.append('game', this.gameService.getActiveGame().title);
    params = params.append('organizer_ID', '1'); // fix with active user ID

    this.api.post('tournament/new', params).subscribe(res => {
      console.log(res);
    });
    this.router.navigate(['tournamentHome']);

  }

}
