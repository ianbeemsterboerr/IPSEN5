import {Injectable} from '@angular/core';
import {Tournament} from '../shared/model/tournament';
import {ApiService} from '../shared/api.service';
import {Observable} from 'rxjs/Observable';
import { User } from '../shared/model/user';

@Injectable()
export class TournamentService {

    constructor(private api: ApiService) {
    }

    getTournament(id: number): Observable<Tournament> {
        return this.api.get<Tournament>(`tournament/get/${id}`);
    }

    getAllUsers(): Observable<User[]> {
        return this.api.get<User[]>('users/all');
    }

    inviteForTournament(tournamentId, userId) {
        return this.api.post('tournament/invite', {tournamentId, userId});
    }
    startTournament(id: number) {
        return this.api.get(`tournament/matchmake/${id}`);
    }
    getPouleNumber(id: number) {
      return this.api.get(`tournament/pouleNumber/${id}`);
    }

}
