import {Game} from "./game";
import {Trophy} from "../shared/model/trophy";

export class CodGame implements Game {
  header_img: string;
  title: string;

  constructor () {
    this.header_img = "/assets/img/cod/header_image.png";
    this.title = "Call of Duty";
  }

  getTrophy(): Trophy {
    return null;
  }

  getTop5(): any {
    return "this is cod";
  }
}
