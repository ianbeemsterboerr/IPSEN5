import {Component, OnInit, ɵEMPTY_ARRAY} from '@angular/core';
import {ATournament} from '../../ATournament';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TournamentService} from '../../../tournament.service';
import {Tournament} from '../../../../shared/model/tournament';
import {TeamMember} from '../../../../shared/model/team_member';
import {containsElement} from '@angular/animations/browser/src/render/shared';
import {Match} from '../../../../shared/model/match';
import {MatchResultComponent} from '../../../../match-result/match-result.component';

@Component({
  selector: 'app-poules',
  templateUrl: './poules.component.html',
  styleUrls: ['./poules.component.css']
})
export class PoulesComponent extends ATournament implements OnInit {

  poules = [];
  teams = [];
  constructor(private modalService: NgbModal, tournamentService: TournamentService) {
    super(tournamentService);
  }

  ngOnInit() {
    this.loadTournament();
  }
  loadTournament() {
    this.poules = [];
    this.teams = [];
    for (const match of this.tournament.matches) {
      const pouleNumber = Number(match.special.data);
      if (!this.poules.includes(pouleNumber)) {
        this.poules.push(pouleNumber);
        this.teams.push([]);
      }
      for (const opponent of match.opponents) {
        const team_id = opponent.team.id;
        let includes = false;
        for (const team of this.teams[pouleNumber]) {
          if (team_id === team.id) {
            includes = true;
          }
        }
        if (!includes) {
          this.teams[pouleNumber].push(opponent.team);
        }
      }
    }
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
    this.tournament = tournament;
    this.loadTournament();
  }

  matchClicked(match: Match) {
    if(match.opponents.length > 1 && localStorage.getItem('activeUserId')!=null){
      const modalRef = this.modalService.open(MatchResultComponent);
      modalRef.componentInstance.match = match;
    }
  }

}
