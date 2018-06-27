import { Component, OnInit } from '@angular/core';
import {Trophy} from "../../shared/model/trophy";
import {GameService} from "../../games/game.service";
import {Router, RouterState} from '@angular/router';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  active_trophy: Trophy;

  constructor(public gameservice: GameService, private router: Router, private userService: UserService) {
    this.active_trophy = gameservice.getActiveGame().getTrophy();

  }

  ngOnInit() {

  }
  goTournaments() {
    this.router.navigate(['/tournaments']);
  }
  goProfile() {
    this.router.navigate(['/user', this.userService.activeUserId]);
  }

}
