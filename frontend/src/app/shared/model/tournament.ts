import {User} from './user';
import {Enrollment} from './enrollment';
import {Match} from './match';

export class Tournament {
    constructor (
        public organiser: User,
        public gamename: string,
        public tournament_typename: string,
        public signup_typename: string,
        public name: string,
        public description: string,
        public max_team_size: number,
        public signup_start: Date,
        public signup_end: Date,
        public tournament_start: Date,
        public id?: number,
        public organizer_user_id?: number,
        public enrollments?: Enrollment[],
        public matches?: Match[],
        public created_at?: Date,
        public updated_at?: Date
    ) {

    }

}
