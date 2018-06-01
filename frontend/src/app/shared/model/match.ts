import {Team} from "./team";
import {Opponent} from "./opponent";

export class Match {
  constructor (
    public id: number,
    public parent_match_id: number,
    public tournament_id: number,
    public opponents: Opponent[],
  ) {}
}
