import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {Tournament} from '../../shared/model/tournament';
import {TournamentService} from '../tournament.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Team} from '../../shared/model/team';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ToastrService} from 'ngx-toastr';
import {SearchPipe} from '../../shared/search.pipe';
import {ErrorhandlerService} from "../../shared/errorhandler.service";
import {ATournament} from "../tournament-overviews/ATournament";
import {Enrollment} from "../../shared/model/enrollment";
import {forEach} from "@angular/router/src/utils/collection";

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
export class TournamentComponent extends ATournament implements OnInit {
    @ViewChild('inviteElement') inviteElement: ElementRef;

    public static INACTIVE_STATE = 'inactive';
    public static ACTIVE_STATE = 'active';

    public teams: Team[];
    public isOrganizer: boolean;
    public isStarted: boolean;

    public syncingTeams: boolean = false;
    private checkedTeams: Team[] = [];

    public searchString;

    public invitableListState = TournamentComponent.INACTIVE_STATE;

    constructor(
        tournamentService: TournamentService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private errorHandler: ErrorhandlerService
    ) {
        super(tournamentService);
        this.searchString = '';
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];

            this.tournamentService.getTournament(id).subscribe(
                tournament => {
                    this.tournament = tournament;
                    this.isOrganizer = localStorage.getItem('activeUserId') === this.tournament.organizer_user_id.toString();
                    this.isStarted = this.tournament.matches.length > 0;
                },
                error => {
                    this.errorHandler.handleError(error);
                    this.router.navigateByUrl('tournaments')
                }
            );
        });
    }

    public getTeamList() {
        if (this.invitableListState != TournamentComponent.ACTIVE_STATE) {
            return;
        }

        this.scroll(this.inviteElement.nativeElement);
        this.syncingTeams = true;
        this.tournamentService.getAllQualifyingTeams(this.tournament).subscribe(
            data => {
                this.teams = data;
                this.scroll(this.inviteElement.nativeElement);
            },
            error => {
                this.errorHandler.handleError(error);
                this.invitableListState = TournamentComponent.INACTIVE_STATE
            },
            () => {
                this.syncingTeams = false;
            }
        );
    }

    public invite(id) {
        this.tournamentService.inviteForTournament(this.tournament.id, id).subscribe(
            data => {
                console.log(data);
                this.toastr.success(data['name'] + ' invited for tournament: ' + this.tournament.name, 'Success!');
            }, err => {
                this.errorHandler.handleError(err);
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
                succes => {
                    this.toastr.success('Tournament started!');
                    this.goOverview();
                },
                failure => {
                    this.errorHandler.handleError(failure)
                }
            );
        }
    }

    enroll(team: Team) {
        this.tournamentService.enroll(team.id, this.tournament.id).subscribe(
            data => {
                this.toastr.success(`${team.name} successfully enrolled.`);
                this.update();
            },
            error => {
                this.errorHandler.handleError(error);
            }
        );
    }

    unEnroll(enrollment: Enrollment) {
        this.tournamentService.unEnroll(enrollment).subscribe(
            succes => {
                this.toastr.success(`${enrollment.team.name} was successfully removed from the tournament.`);
                this.update();
            },
            error => {
                this.errorHandler.handleError(error);
            }
        );
    }

    onUpdate(tournament: Tournament): void {
        this.getTeamList();
    }

    scroll(el) {
        el.scrollIntoView({behavior:"smooth"});
    }


    inviteCheckedChange(event, team: Team) {
        if (event.target.checked) {
            this.checkedTeams.push(team);
        } else {
            this.checkedTeams.splice(this.checkedTeams.indexOf(team), 1);
        }
    }

    inviteChecked() {
        for (let team of this.checkedTeams) {
            this.tournamentService.enroll(team.id, this.tournament.id).subscribe(
                success => {
                    this.toastr.success(`${team.name} was successfully enrolled.`);
                    this.update();
                },
                error => {
                    this.errorHandler.handleError(error);
                }
            );
        }

        this.checkedTeams = [];
    }
}
