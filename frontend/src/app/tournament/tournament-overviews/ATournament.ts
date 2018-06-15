import {Input} from "@angular/core";
import {Tournament} from "../../shared/model/tournament";
import {TournamentService} from "../tournament.service";

export abstract class ATournament {
    @Input() tournament: Tournament;

    protected constructor (private tournamentService: TournamentService) {}

    update(): void {
        this.tournamentService.getTournament(this.tournament.id).subscribe(
            next => {
                this.tournament = next;
                this.onUpdate(this.tournament);
            },
            error => {

            }
        )
    };

    abstract onUpdate(tournament: Tournament): void;
}