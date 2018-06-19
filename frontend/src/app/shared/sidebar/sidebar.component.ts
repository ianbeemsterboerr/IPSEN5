import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {GameService} from "../../games/game.service";
import {Game} from "../../games/game";
import {UserService} from "../user.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    animations: [
        trigger('expanded', [
            state('active', style(
                {
                    width: '6rem',
                    visibility: 'visible'
                }
            )),
            state('inactive', style(
                {
                    width: '0rem',
                    visibility: 'hidden'
                }
            )),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ])
    ]
})
export class SidebarComponent implements OnInit {
    public state = 'active';
    public activeGame: Game = this.gameService.getActiveGame();

    constructor(private router: Router, public gameService: GameService, public userService: UserService) {
    }

    ngOnInit() {
    }

    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
    }

    onGameChanged() {
        this.gameService.setActiveGame(this.activeGame);
    }

    logout() {
        this.userService.logout();
    }
}
