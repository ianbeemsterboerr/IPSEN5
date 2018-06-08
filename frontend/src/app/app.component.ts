import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import {GameService} from './games/game.service';
import {Game} from './games/game';
import { ActiveaccountService } from './services/activeaccount.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GameService]
})
export class AppComponent {
  title = 'app';

  constructor (public gameservice: GameService, public activeAccountService: ActiveaccountService) {
  }
}
