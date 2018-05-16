import { Component, OnInit } from '@angular/core';
import {Trophy} from "../../shared/model/trophy";
import {GameService} from "../../games/game.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  active_trophy: Trophy;

  constructor(public gameservice: GameService) {
    this.active_trophy = gameservice.getActiveGame().getTrophy();

  }

  ngOnInit() {

  }

}
