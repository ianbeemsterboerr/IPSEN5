import {Player} from "./player";

export class Team {
  constructor (
    public players: Player[],
    public name: string
  ) {}
}