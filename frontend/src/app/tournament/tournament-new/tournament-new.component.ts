import { Component, OnInit } from '@angular/core';

import {HttpParams} from '@angular/common/http';
import {Params, Router} from '@angular/router';
import {ApiService} from '../../shared/api.service';
import {GameService} from '../../games/game.service';
import {Tournament} from '../../shared/model/tournament';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-tournament-new',
  templateUrl: './tournament-new.component.html',
  styleUrls: ['./tournament-new.component.css']
})
export class TournamentNewComponent implements OnInit {

  constructor(private api: ApiService, private gameService: GameService, private router: Router) { }

  submitDisabled = true;
  newTournament = new Tournament(0, 0, "", "", "",
    "", "", null, null, null, null,
    null, null);
  tournamentForm: FormGroup;
  ngOnInit() {
    this.tournamentForm = new FormGroup({
      'name': new FormControl(this.newTournament.name, [
        Validators.required,
        Validators.minLength(8)
      ]),
      'date': new FormControl(this.newTournament.tournament_Start, [
        Validators.required
      ]),
      'teamsize': new FormControl(this.newTournament.max_team_size, [
        Validators.required
      ]),
      'signupStart': new FormControl(this.newTournament.signup_start, [
        Validators.required
      ]),
      'signupEnd': new FormControl(this.newTournament.signup_end, [
        Validators.required
      ])
    });
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
  get name() { return this.tournamentForm.get('name'); }
  get date() { return this.tournamentForm.get('date'); }
  get teamsize() { return this.tournamentForm.get('teamsize'); }
  get signupStart() { return this.tournamentForm.get('signupStart'); }
  get signupEnd() { return this.tournamentForm.get('signupEnd'); }



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
    params = params.append('organizer_ID', localStorage.getItem('activeUserId'));



    this.api.post('tournament/new', params).subscribe(res => {
      console.log(res);
    });
    this.router.navigate(['/tournaments']);

  }

}
