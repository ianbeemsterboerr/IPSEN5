import {Team} from "./team";

export class Match {
  constructor (
    public matchID: number,
    public teams: Team[],
    public nextMatch: number, //id
    public previousMatches: number[] //id's
  ) {}
}
