import {Team} from "./team";

export class Opponent {
    constructor (
        public id: number,
        public match_id: number,
        public team_id: number,
        public team?: Team
    ) {}
}
