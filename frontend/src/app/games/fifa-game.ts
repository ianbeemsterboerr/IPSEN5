import {Game} from "./game";
import {Trophy} from "../shared/model/trophy";

export class FifaGame implements Game{
  header_img: string;
  title: string;

  constructor () {
    this.header_img = "/assets/img/fifa/header_image.png";
    this.title = "Fifa"
  }

  getTrophy(): Trophy {
    return null;
  }

  getTop5(): any {
    return "This is fifa";
  }
}
