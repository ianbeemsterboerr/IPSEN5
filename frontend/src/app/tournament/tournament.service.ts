import {Injectable} from '@angular/core';
import {Tournament} from '../shared/model/tournament';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs/Observable';
import { Team } from '../shared/model/team';

@Injectable()
export class TournamentService {

    constructor(private api: ApiService) {
    }

    getTournament(id: number): Observable<Tournament> {
        return this.api.get<Tournament>(`tournament/get/${id}`);
    }

    getAllTeams(size: number= 1): Observable<Team[]> {
        return this.api.get<Team[]>('teams/all/' + size);
    }

    inviteForTournament(tournamentId, teamId) {
        return this.api.post('tournament/invite', {tournamentId, teamId});
    }
    startTournament(id: number) {
        return this.api.get(`tournament/matchmake/${id}`);
    }

}
