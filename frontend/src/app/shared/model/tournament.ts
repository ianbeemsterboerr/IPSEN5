export class Tournament {
    constructor (
        public ID: number,
        public organizer_userID: number,
        public gamename: string,
        public tournament_typename: string,
        public signup_typename: string,
        public name: string,
        public description: string,
        public max_team_size: number,
        public signup_start: Date,
        public signup_end: Date,
        public tournament_Start: Date,
        public created_at: Date,
        public updated_at: Date
    ) {

    }
}
