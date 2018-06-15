import { Component, OnInit } from '@angular/core';
import {ATournament} from '../../ATournament';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TournamentService} from '../../../tournament.service';
import {Tournament} from '../../../../shared/model/tournament';
import {TeamMember} from '../../../../shared/model/team_member';

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
    console.log(this.tournament.matches);
  }
  getMatches() {
    return this.tournament.matches;
  }
  getTeamMembers(id: number): TeamMember[] {
    for (let enrollment of this.tournament.enrollments) {
      if (enrollment.team_id == id) {
        return enrollment.team.team_members;
      }
    }
    return [];
  }

  onUpdate(tournament: Tournament): void {
    // this.tournament = tournament;
    // this.loadTournament();
  }

}