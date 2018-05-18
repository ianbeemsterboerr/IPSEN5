import { Injectable } from '@angular/core';
import {Game} from "./game";
import {FifaGame} from "./fifa-game";
import {CodGame} from "./cod-game";

@Injectable()
export class GameService {
  public availableGames: Game[] = [
    new FifaGame(),
    new CodGame()
  ];
  private activeGame: Game;

  constructor () {
    this.activeGame = this.availableGames[0];
  }


  public setActiveGame(game: Game) {
    this.activeGame = game;
  }

  public getActiveGame(): Game {
    return this.activeGame;
  }
}
