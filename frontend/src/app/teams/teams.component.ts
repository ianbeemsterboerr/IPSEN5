import { TeamMember } from './../shared/model/team_member';
import { TeamService } from './team.service';
import { ErrorhandlerService } from './../shared/errorhandler.service';
import { Team } from './../shared/model/team';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[];

  constructor(private errorHandler: ErrorhandlerService, private teamService: TeamService) {
    this.teamService.getTeamsOfUser().subscribe(
      data => {
        this.teams = data;

        for (const team of this.teams) {
          team.team_members = this.getTeamMembers(team.id);
        }
        console.log(this.teams);
      }, err => {
        this.errorHandler.handleError(err);
      }
    );
  }

  getTeamMembers(id: number): TeamMember[] {  // TODO: Omdat deze functie async is returned hij het object pas later waardoor het runtime nog steeds null is.
    let teamMember: TeamMember[];
    const member1 = new TeamMember(10, 'lmao123');
    const member2 = new TeamMember(789, 'kmsafuiash');
    teamMember = [member1, member2];

    // this.teamService.getTeamMembers(id).subscribe(
    //   data => {
    //     console.log('returned data.');
    //     teamMember = data;
    //   }, err => {
    //     this.errorHandler.handleError(err);
    //   }
    // );
    return teamMember;
  }

  ngOnInit() {
  }
}
