import {Player} from "./player";
import {User} from './user';

export class Team {
  constructor (
    public players: Player[],
    public name: string,
    public team_leader?: User,
    public team_members?: User[]
  ) {}
}
