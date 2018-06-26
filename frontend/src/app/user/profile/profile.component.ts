import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/model/user';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute} from '@angular/router';
import {ErrorhandlerService} from '../../shared/errorhandler.service';
import {Team} from '../../shared/model/team';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public user: User;
    public teams: Team[];

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private errorHandler: ErrorhandlerService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userService.getUserByID(+params['id']).subscribe(
                user => {
                    this.user = user;
                },
                error => {this.errorHandler.handleError(error); }
            );

            // this.userService.getUserTeams(+params['id']).subscribe(
            //     teams => {this.teams = teams},
            //     error => {this.errorHandler.handleError(error)}
            // )
        });
    }

}
