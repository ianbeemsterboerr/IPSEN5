import { Component } from '@angular/core';
import {GameService} from "./games/game.service";
import {Game} from "./games/game";
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GameService]
})
export class AppComponent {
  title = 'app';

  constructor (public gameservice: GameService, public activeAccountService: UserService) {
  }
}
