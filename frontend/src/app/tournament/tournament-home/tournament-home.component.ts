import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tournament-home',
  templateUrl: './tournament-home.component.html',
  styleUrls: ['./tournament-home.component.css']
})
export class TournamentHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goTournamentNew() {
    console.log('go new tourny');
    this.router.navigate(['tournamentNew']);
  }

}
