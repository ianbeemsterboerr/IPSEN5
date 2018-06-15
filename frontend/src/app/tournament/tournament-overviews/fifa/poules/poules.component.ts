import {Component, OnInit, ɵEMPTY_ARRAY} from '@angular/core';
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

  poules = [];
  teams: {'bla': 4};
  constructor(private modalService: NgbModal, tournamentService: TournamentService) {
    super(tournamentService);
  }

  ngOnInit() {
    for (let match of this.tournament.matches){
      this.tournamentService.getPouleNumber(match.id).subscribe(
        data => {
          if (!this.poules.includes(data)) {
            this.poules.push(data);
          }
          // for(let opponent of match.opponents){
          //   if (!this.teams[data].includes(opponent.id)){
          //     this.teams[data.toString()].push(opponent.id);
          //   }
          // }
          console.log(this.teams['bla']);
        }


    );
    }
    console.log(this.poules);
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
