import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GameService} from "../../games/game.service";
import {Game} from "../../games/game";
import {Dummy_tournament} from "../../shared/model/dummy_tournament";
import {ApiService} from "../../shared/api.service";
import {Tournament} from "../../shared/model/tournament";

@Component({
    selector: 'app-tournament-home',
    templateUrl: './tournament-home.component.html',
    styleUrls: ['./tournament-home.component.css']
})
export class TournamentHomeComponent implements OnInit {

    tournaments: Tournament[];

    constructor(private gameService: GameService, private api: ApiService) {
    }

    ngOnInit() {
        this.api.get<Tournament[]>('tournament/all').subscribe(
            data => {
                this.tournaments = data;
            },
            error => {

            }
        );
    }

    getGames(): Game[] {
        return this.gameService.availableGames;
    }

}
