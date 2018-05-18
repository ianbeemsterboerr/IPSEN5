import {Trophy} from "../shared/model/trophy";

export interface Game {
  title: string;
  header_img: string;

  getTrophy(): Trophy;
  getTop5(): any;
}
