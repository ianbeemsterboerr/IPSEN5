import { Component } from '@angular/core';
import {GameService} from "./games/game.service";
import {Game} from "./games/game";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GameService]
})
export class AppComponent {
  title = 'app';
  activeGame: Game;

  constructor (public gameservice: GameService) {
    this.activeGame = gameservice.getActiveGame();
  }

  onGameChanged(event: Game) {
    console.log(this.activeGame.title);
    this.gameservice.setActiveGame(this.activeGame);
  }
}
