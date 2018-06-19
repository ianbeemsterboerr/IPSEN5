import {Player} from './player';
import {User} from './user';
import {TeamMember} from './team_member';

export class Team {
  constructor (
    public id: number,
    public leader_user_id: number,
    public name: string,
    public size: number,
    public max_size: number,
    public team_members: TeamMember[],
    public team_leader?: User
  ) {}
}
