import {Component, OnInit} from '@angular/core';

import {HttpParams} from '@angular/common/http';
import {Params, Router} from '@angular/router';
import {ApiService} from '../../shared/api.service';
import {GameService} from '../../games/game.service';
import {Tournament} from '../../shared/model/tournament';
import {AbstractControl, FormControl, FormGroup, FormsModule, ValidatorFn, Validators} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-tournament-new',
    templateUrl: './tournament-new.component.html',
    styleUrls: ['./tournament-new.component.css']
})
export class TournamentNewComponent implements OnInit {

    constructor(private api: ApiService, private gameService: GameService, private router: Router, private toastr: ToastrService) {
    }

    newTournament = new Tournament(
        null,
        '',
        'Single elimination',
        'Invite only',
        '',
        '',
        null,
        null,
        null,
        null
    );
    tournamentForm: FormGroup;

    ngOnInit() {
        this.tournamentForm = new FormGroup({
            'name': new FormControl(this.newTournament.name, [
                Validators.required
            ]),
            'date': new FormControl(this.newTournament.tournament_start, [
                Validators.required,
                this.tournamentStartValidator()
            ]),
            'tournament_typename': new FormControl(this.newTournament.tournament_typename, []),
            'teamsize': new FormControl(this.newTournament.max_team_size, [
                Validators.required,
                this.teamsizeValidator(1)
            ]),
            'signup_typename': new FormControl(this.newTournament.signup_typename, []),
            'signupStart': new FormControl(this.newTournament.signup_start, [
                Validators.required,
                this.signupStartValidator()
            ]),
            'signupEnd': new FormControl(this.newTournament.signup_end, [
                Validators.required,
                this.signupEndValidator()
            ]),
            'description': new FormControl(this.newTournament.description, [])

        });
    }

    get name() {
        return this.tournamentForm.get('name');
    }

    get date() {
        return this.tournamentForm.get('date');
    }

    get teamsize() {
        return this.tournamentForm.get('teamsize');
    }

    get signupStart() {
        return this.tournamentForm.get('signupStart');
    }

    get signupEnd() {
        return this.tournamentForm.get('signupEnd');
    }

    submitForm() {
        this.api.post('tournament/new', this.newTournament).subscribe(
            succes => {
                this.toastr.success("Tournament created!");
            },
            failure => {
                this.toastr.error("Zie console.");
            },
            () => {
                this.router.navigate(['/tournaments']);
            }
        );

    }

    teamsizeValidator(allowedSize: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const invalid = control.value < allowedSize && control.value != null;
            return invalid ? {'teamsizeInvalid': {value: control.value}} : null;
        };
    }

    tournamentStartValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const empty = control.value == null;
            const today = new Date();
            const input = new Date(control.value + 'T23:59:59');
            const signupStart = new Date(this.newTournament.signup_start + 'T00:00:00');
            const signupEnd = new Date(this.newTournament.signup_end + 'T23:59:59');

            const invalidPast = input < today && !empty;
            const invalidSignupStart = input < signupStart && !empty;
            const invalidSignupEnd = input < signupEnd && !empty;
            if (invalidPast) {
                return {'futureDateInvalid': {value: control.value}};
            } else if (invalidSignupStart) {
                return {'signupStartInvalid': {value: control.value}};
            } else if (invalidSignupEnd) {
                return {'signupEndInvalid': {value: control.value}};
            } else {
                return null;
            }
        };
    }

    signupStartValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const empty = control.value == null;
            const today = new Date();
            const input = new Date(control.value + 'T23:59:59');
            const signupEnd = new Date(this.newTournament.signup_end + 'T23:59:59');
            const tournamentStart = new Date(this.newTournament.tournament_start + 'T23:59:59');

            const invalidPast = input < today && !empty;
            const invalidTournament = input > tournamentStart && !empty;
            const invalidSignupEnd = input > signupEnd && !empty;
            if (invalidPast) {
                return {'futureDateInvalid': {value: control.value}};
            } else if (invalidTournament) {
                return {'tournamentInvalid': {value: control.value}};
            } else if (invalidSignupEnd) {
                return {'signupEndInvalid': {value: control.value}};
            } else {
                return null;
            }
        };
    }

    signupEndValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const empty = control.value == null;
            const today = new Date();
            const input = new Date(control.value + 'T23:59:59');
            const signupStart = new Date(this.newTournament.signup_start + 'T00:00:00');
            const tournamentStart = new Date(this.newTournament.tournament_start + 'T23:59:59')

            const invalidPast = input < today && !empty;
            const invalidSignupStart = input < signupStart && !empty;
            const invalidTournament = input > tournamentStart && !empty;
            if (invalidPast) {
                return {'futureDateInvalid': {value: control.value}};
            } else if (invalidSignupStart) {
                return {'signupStartInvalid': {value: control.value}};
            } else if (invalidTournament) {
                return {'tournamentInvalid': {value: control.value}};
            } else {
                return null;
            }
        };
    }
}


