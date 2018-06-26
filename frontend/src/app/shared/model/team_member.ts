import {User} from './user';
import {Team} from './team';


export class TeamMember {
  constructor (
    public user_id: number,
    public username: string
  ) {}
}
