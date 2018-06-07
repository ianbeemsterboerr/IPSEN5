import {Input} from "@angular/core";
import {Tournament} from "../../shared/model/tournament";

export class ATournament {
    @Input() tournament: Tournament;
}