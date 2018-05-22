import {Team} from "./team";
import {Bracket} from "./bracket";

export class Tournament {
  constructor(
    public team: Team[],
    public brackets: Bracket[]
  ) {

  }
}
