import {Team} from "./team";
import {Result} from "./Result";

export class Opponent {
    constructor (
        public id: number,
        public match_id: number,
        public team_id: number,
        public team?: Team,
        public result?: Result
    ) {}
}
