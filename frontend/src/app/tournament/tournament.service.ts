import {Injectable} from '@angular/core';
import {Tournament} from '../shared/model/tournament';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs/Observable';
import { Team } from '../shared/model/team';
import {Enrollment} from '../shared/model/enrollment';

@Injectable()
export class TournamentService {

    constructor(private api: ApiService) {
    }

    getTournament(id: number): Observable<Tournament> {
        return this.api.get<Tournament>(`tournament/get/${id}`);
    }

    getAllTeamsOfSize(size: number= 1): Observable<Team[]> {
        return this.api.get<Team[]>(`teams/all/${size}`);
    }

    // Teams that can be enrolled.
    getAllQualifyingTeams(tournament: Tournament): Observable<Team[]> {
        return this.api.get<Team[]>(`teams/qualifying/${tournament.id}`);
    }

    inviteForTournament(tournamentId, teamId) {
        return this.api.post('tournament/invite', {tournamentId, teamId});
    }
    startTournament(id: number) {
        return this.api.get(`tournament/matchmake/${id}`);
    }

    enroll(team_id: number, tournament_id: number) {
        return this.api.get(`tournament/enroll/${tournament_id}/${team_id}`);
    }

    unEnroll(enrollment: Enrollment) {
        return this.api.get(`tournament/unEnroll/${enrollment.tournament_id}/${enrollment.team_id}`);
    }

    getTournamentsInvited(userId: number) {
      return this.api.get<Tournament[]>(`tournament/invitedfor/${userId}`);
    }
}
