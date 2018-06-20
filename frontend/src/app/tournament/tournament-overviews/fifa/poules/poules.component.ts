import {Component, OnInit, ɵEMPTY_ARRAY} from '@angular/core';
import {ATournament} from '../../ATournament';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TournamentService} from '../../../tournament.service';
import {Tournament} from '../../../../shared/model/tournament';
import {TeamMember} from '../../../../shared/model/team_member';
import {containsElement} from '@angular/animations/browser/src/render/shared';
import {Match} from '../../../../shared/model/match';
import {MatchResultComponent} from '../../../../match-result/match-result.component';
import {Team} from '../../../../shared/model/team';
import {ApiService} from '../../../../shared/api.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-poules',
  templateUrl: './poules.component.html',
  styleUrls: ['./poules.component.css']
})
export class PoulesComponent extends ATournament implements OnInit {

  poules = [];
  teams = [];
  constructor(private modalService: NgbModal, public tournamentService: TournamentService, private api: ApiService,
              private toastr: ToastrService, private router: Router) {
    super(tournamentService);
  }

  ngOnInit() {
    this.loadTournament();
    if (this.tournament.matches) {
      this.sortPoules();
    }
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
  getWins(team: Team) {
    let score = 0;
    for (let match of this.tournament.matches) {
      let highest_score = 0;
      let highest_team = null;
      for (let opponent of match.opponents) {
        if (opponent.result.score > highest_score) {
          highest_score = opponent.result.score;
          highest_team = opponent.team;
        }
      }
      if (highest_team) {
        if (team.id === highest_team.id) {
          score += 1;
        }
      }
    }
    return score;
  }
  getGoals(team: Team) {
    let goals = 0;
    for (let match of this.tournament.matches) {
      let hasTeam = false;
      let matchGoals = 0;
      for (let opponent of match.opponents) {
          matchGoals -= opponent.result.score;
          if (opponent.team.id === team.id) {
            hasTeam = true;
            matchGoals += 2 * opponent.result.score;
        }
      }
      if (hasTeam) {
        goals += matchGoals;
      }
    }
    return goals;
  }
  getPlayed(team: Team) {
    let count = 0;
    for (let match of this.tournament.matches) {
      let played = false;
      let hasTeam = false;
      for (let opponent of match.opponents) {
        if (opponent.result.score !== 0) {
          played = true;
        }
        if (opponent.team.id === team.id) {
          hasTeam = true;
        }
      }
      if (played && hasTeam) {
        count += 1;
      }
    }
    return count;
  }
  sortPoules() {
    for (let poule of this.teams) {
      this.teams[this.teams.indexOf(poule)] = this.sortPoule(poule);
    }
  }
  sortPoule(teams: Team[]) {
    let teamsSorted = [];
    teamsSorted.push(teams.pop());

    for (let team of teams) {
      for (let sortedTeam of teamsSorted) {
        if (this.getWins(team) > this.getWins(sortedTeam)) {
          teamsSorted.splice(teamsSorted.indexOf(sortedTeam), 0, team);
          break;
        } else if ((this.getGoals(team) > this.getGoals(sortedTeam)) && (this.getWins(team) === this.getWins(sortedTeam))) {
          teamsSorted.splice(teamsSorted.indexOf(sortedTeam), 0, team);
          break;
        }
      }
      if (!teamsSorted.includes(team)) {
        teamsSorted.push(team);
      }
    }
    return teamsSorted;
  }
  toBracket() {
    let winners = [];


    for (let poule of this.teams) {
      winners.push(poule[0]);
    }
    console.log(winners);

    let eliminationTournament = this.tournament;
    eliminationTournament.name += ' Elimination Phase';
    eliminationTournament.matches = [];
    eliminationTournament.tournament_typename = 'Single elimination';


    this.api.post('tournament/new', eliminationTournament).subscribe(
      succes => {
        eliminationTournament.id = succes['id'];
        for (let team of winners) {
          this.api.get(`tournament/enroll/${succes['id']}/${team.id}`).subscribe();
        }
        this.toastr.success('Elimination Phase created!');
      },
      failure => {
        this.toastr.error('Zie console.');
      },
      () => {
        this.router.navigate([`tournaments/${eliminationTournament.id}`]);
      }
    );


  }
}
