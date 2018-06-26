import { Observable } from 'rxjs/Observable';
import { ApiService } from './../shared/api.service';
import { Injectable } from '@angular/core';
import { Team } from '../shared/model/team';
import { TeamMember } from '../shared/model/team_member';

@Injectable()
export class TeamService {

  constructor(private api: ApiService) { }

  getTeamsOfUser(): Observable<Team[]> {
    return this.api.get<Team[]>('teams/getteamsofuser');
  }

  getTeamMembers(id: number): Observable<TeamMember[]> {
    return this.api.get<TeamMember[]>(`teams/getteammembers/${id}`);
  }
}
