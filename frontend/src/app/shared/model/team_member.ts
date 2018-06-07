import {User} from './user';
import {Team} from './team';


export class TeamMember {
  constructor (
    public user_id: number,
    public team_id: number,
    public user: User,
    public team: Team
  ) {}
}
