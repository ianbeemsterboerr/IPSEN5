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
    public users: User[];
    public today: Date = new Date();
    public start: Date;
    //public stringarray = ['lol', 'lmao', 'xd'];

    constructor(
        private tournamentService: TournamentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];


            this.tournamentService.getTournament(id).subscribe(
                tournament => {this.tournament = tournament; this.start = new Date(this.tournament.signup_end)},
                error => {/*todo: resolve error case*/},
                () => {}
            );
        });
    }

    public getUserList(){
        console.log('getuserlist activated')
        this.tournamentService.getAllUsers().subscribe(
            data=>{
                this.users = data;
            }
        );
        console.log(this.users);
    }

    public invite(id){
        this.tournamentService.inviteForTournament(this.tournament.id, id).subscribe(
            data=>{
                console.log(data);
                //give notification of success.
            },err=>{
                //give notification of error.
                console.log(err);
            }
        )
    }
}
