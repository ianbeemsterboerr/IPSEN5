import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {Tournament} from "../../shared/model/tournament";
import {TournamentService} from "../tournament.service";
import {ActivatedRoute} from "@angular/router";
import {User} from '../../shared/model/user';
import {Enrollment} from '../../shared/model/enrollment';
import {Team} from '../../shared/model/team';

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
    public tournament: Tournament;
    public isOrganizer: boolean;

    public today: Date = new Date();
    public start: Date;

    constructor(
        private tournamentService: TournamentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];


            this.tournamentService.getTournament(id).subscribe(
                tournament => {
                  this.tournament = tournament;
                  this.start = new Date(this.tournament.signup_end);
                  this.isOrganizer = localStorage.getItem('activeUserId') === this.tournament.organizer_user_id.toString();
                },
                error => {/*todo: resolve error case*/},
                () => {}
            );
        });
    }
    startTournament() {
      if (confirm('Starting the tournament finalizes enrollments. No players or teams can be added after this point.')) {
        console.log('Starting tournament..');
        // todo connect to actual function
      }
    }
}
