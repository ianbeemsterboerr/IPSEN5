import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {Tournament} from '../../shared/model/tournament';
import {TournamentService} from '../tournament.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Team} from '../../shared/model/team';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ToastrService} from 'ngx-toastr';
import { SearchPipe } from '../../shared/search.pipe';
import {ErrorhandlerService} from '../../shared/errorhandler.service';
import {ATournament} from '../tournament-overviews/ATournament';
import {Enrollment} from '../../shared/model/enrollment';

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
    public allowedTeams: Team[];
    public isOrganizer: boolean;
    public hasMatches: boolean;
    public isNotInMatch: boolean;
    public additionalMembers: boolean;
    public user_id = localStorage.getItem('activeUserId');
    public isStarted: boolean;

    public syncingTeams = false;
    private checkedTeams: Team[] = [];

    public searchString;

    public invitableListState = TournamentComponent.INACTIVE_STATE;

    constructor(
        tournamentService: TournamentService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private errorHandler: ErrorhandlerService,
        private api: ApiService
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
                    this.checkEnrollment();
                    this.getQualifyingByUser();
                    this.additionalMembers = this.tournament.max_team_size > 1;
                },
                error => {
                    this.errorHandler.handleError(error);
                    this.router.navigateByUrl('tournaments');
                }
            );
        });
    }

    public getTeamList() {
        if (this.invitableListState !== TournamentComponent.ACTIVE_STATE) {
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
                this.invitableListState = TournamentComponent.INACTIVE_STATE;
            },
            () => {
                this.syncingTeams = false;
            }
        );
    }

    public invite(team) {
        this.tournamentService.inviteForTournament(this.tournament.id, team.id).subscribe(
            data => {
              this.toastr.success( data['name'] + ' invited for tournament: ' + this.tournament.name, 'Success!');
              const index = this.teams.indexOf(team);
              this.teams.splice(index, 1);
            }, err =>  {
              this.errorHandler.handleError(err);
            }
        );
    }

    goOverview() {
        this.router.navigate([`tournaments/overview/${this.tournament.id}`]);
    }

    public checkEnrollment(){
        this.api.get('tournament/checkEnrollment/' + this.tournament.id).subscribe(
            data => {
                if(data['response'] == 'Found'){
                    this.isNotInMatch = false;
                } else {
                    this.isNotInMatch = true;
                };
            }, err => {
                console.log("Something has gone wrong");
            }
        );
        return false;
    }
    checkTrueOrFalse(){
        console.log(this.isNotInMatch);
    }

    enrollment(){
        this.api.get('tournament/enroll/' + this.tournament.id).subscribe(
            succes => {
                this.toastr.success("U bent aangemeld.");
                this.isNotInMatch = false;
            },
            failure => {
                this.toastr.error("Zie console.");
            }
         );
    }

    enrollAsTeam(team_id){
        this.api.get('tournament/enroll/' + this.tournament.id + '/' + team_id).subscribe(
            succes => {
                this.toastr.success("U bent aangemeld.");
                this.isNotInMatch = false;
            },
            failure => {
                this.toastr.error("Zie console.");
            }
         );
    }

    getQualifyingByUser(){
        this.tournamentService.getQualifyingByUser(this.tournament.id).subscribe(
            data => {
                this.allowedTeams = data;
            }
        );
    }

    checkGetTeam(a){
        console.log(a);
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
                    this.errorHandler.handleError(failure);
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
        el.scrollIntoView({behavior: 'smooth'});
    }


    inviteCheckedChange(event, team: Team) {
        if (event.target.checked) {
            this.checkedTeams.push(team);
        } else {
            this.checkedTeams.splice(this.checkedTeams.indexOf(team), 1);
        }
    }

    inviteChecked() {
        for (const team of this.checkedTeams) {
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
