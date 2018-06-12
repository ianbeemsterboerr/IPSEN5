import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {Tournament} from '../../shared/model/tournament';
import {TournamentService} from '../tournament.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../shared/model/user';
import {Enrollment} from '../../shared/model/enrollment';
import {Team} from '../../shared/model/team';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.css'],
    animations: [
        trigger('invitables_expanded', [
            state('active', style(
                {
                    height: '500px',
                    visibility: 'visible'
                }
            )),
            state('inactive', style(
                {
                    height: '0px',
                    visibility: 'hidden'
                }
            )),
            transition('inactive => active', animate('500ms ease-in')),
            transition('active => inactive', animate('500ms ease-out'))
        ])
    ]
})
export class TournamentComponent implements OnInit {
    public tournament: Tournament;
    public users: User[];
    public isOrganizer: boolean;
    public hasMatches: boolean;
    public additionalMembers: boolean;

    public today: Date = new Date();
    public start: Date;
    // public stringarray = ['lol', 'lmao', 'xd'];

    public invitableListState = 'inactive';

    constructor(
        private tournamentService: TournamentService,
        private route: ActivatedRoute,
        private router: Router
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
                  this.hasMatches = this.tournament.matches.length > 0;
                  this.additionalMembers = this.tournament.max_team_size > 1;
                },
                error => {/*todo: resolve error case*/},
                () => {}
            );
        });
    }

    public getUserList() {
        if (this.invitableListState == 'active') {
            this.invitableListState = 'inactive';
            return;
        }

        this.tournamentService.getAllUsers().subscribe(
            data => {
                this.users = data;
                this.invitableListState = 'active';
            }
        );

    }

    public invite(id) {
        this.tournamentService.inviteForTournament(this.tournament.id, id).subscribe(
            data => {
                console.log(data);
                // give notification of success..
            }, err =>  {
                // give notification of error..
                console.log(err);
            }
        );
      }
    goOverview() {
      this.router.navigate([`tournaments/overview/${this.tournament.id}`]);
    }

    startTournament() {
      if (confirm('Starting the tournament finalizes enrollments. No players or teams can be added after this point.')) {
        console.log('Starting tournament..');
        this.tournamentService.startTournament(this.tournament.id).subscribe(
          repsonse => {
            this.goOverview();
          }
        );
      }
    }
}
