import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GameService} from "../../games/game.service";
import {Game} from "../../games/game";
@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.css']
})
export class TournamentHomeComponent implements OnInit {

  constructor(private gameService : GameService) { }

  ngOnInit() {
  }

  getGames(): Game[] {
    return this.gameService.availableGames;
  }

}
