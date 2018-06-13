import { Component, OnInit } from '@angular/core';
import {ATournament} from '../../ATournament';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TournamentService} from '../../../tournament.service';
import {Tournament} from '../../../../shared/model/tournament';

@Component({
  selector: 'app-poules',
  templateUrl: './poules.component.html',
  styleUrls: ['./poules.component.css']
})
export class PoulesComponent extends ATournament implements OnInit {

  constructor(private modalService: NgbModal, tournamentService: TournamentService) {
    super(tournamentService);
  }

  ngOnInit() {
  }

  onUpdate(tournament: Tournament): void {
    // this.tournament = tournament;
    // this.loadTournament();
  }

}
