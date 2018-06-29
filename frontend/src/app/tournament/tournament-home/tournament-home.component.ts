import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from './../../shared/errorhandler.service';
import { UserService } from './../../shared/user.service';
import { TournamentService } from './../tournament.service';
import {Component, OnInit} from '@angular/core';
import {GameService} from '../../games/game.service';
import {Game} from '../../games/game';
import {ApiService} from '../../shared/api.service';
import {Tournament} from '../../shared/model/tournament';

@Component({
    selector: 'app-tournament-home',
    templateUrl: './tournament-home.component.html',
    styleUrls: ['./tournament-home.component.css']
})
export class TournamentHomeComponent implements OnInit {

    tournaments: Tournament[];
    tournamentsInvitedFor: Tournament[];
    constructor(private tournamentService: TournamentService , private gameService: GameService, private api: ApiService, private userService: UserService, private errorHandler: ErrorhandlerService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.api.get<Tournament[]>('tournament/all').subscribe(
            data => {
                this.tournaments = data;
            },
            error => {
            }
        );

        this.tournamentService.getTournamentsInvited(this.userService.getActiveUserId()).subscribe(
        data => {
          this.tournamentsInvitedFor = data;
        }, err => {
          this.errorHandler.handleError(err);
        }
      );
    }

    getGames(): Game[] {
        return this.gameService.availableGames;
    }

    enroll(tournament: Tournament) {
      // delete from invitees table:(handled serverside).

      // add to enrollment table:
      this.tournamentService.enroll(tournament.inviteteamid, tournament.id).subscribe(
        data => {
          this.toastr.success('Succesfully enrolled for ' + tournament.name + '!', 'Success!');
          const index = this.tournamentsInvitedFor.indexOf(tournament, 0);
          if (index > -1) {
            this.tournamentsInvitedFor.splice(index, 1);
         }
        }, err => {
          this.errorHandler.handleError(err);
        }
      );
    }

}
