import {Team} from "./team";

export class Enrollment {
    constructor (
        public tournament_id: number,
        public team_id: number,
        public team?: Team,
    ) {}
}
