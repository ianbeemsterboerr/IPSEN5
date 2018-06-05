import {Injectable} from '@angular/core';
import {Tournament} from "../shared/model/tournament";
import {ApiService} from "../shared/api.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TournamentService {

    constructor(private api: ApiService) {
    }

    getTournament(id: number): Observable<Tournament> {
        return this.api.get<Tournament>(`tournament/get/${id}`);
    }
}
