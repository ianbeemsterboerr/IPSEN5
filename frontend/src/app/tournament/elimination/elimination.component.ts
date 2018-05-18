import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/api.service";

@Component({
  selector: 'app-elimination',
  templateUrl: './elimination.component.html',
  styleUrls: ['./elimination.component.css']
})
export class EliminationComponent implements OnInit {

  tournament: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get('tournament/dummy', {teams: 32}).subscribe(
      next=> {
        this.tournament = next;
      }
    )
  }



}
