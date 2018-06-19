import {Team} from "./team";
import {Opponent} from "./opponent";
import {Match_special} from './match_special';

export class Match {
  constructor (
    public id: number,
    public parent_match_id: number,
    public tournament_id: number,
    public opponents: Opponent[],
    public special: Match_special
  ) {}
}
