import { Component, OnInit } from '@angular/core';
import{PARTICIPANTS} from "./mockparticipants";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  participants = PARTICIPANTS;

  constructor() { }
  ngOnInit() {
  }
  addParticipant(){
    console.log("added");
    console.log(this.participants);

    this.participants.push({id:1, name: "TEST"});
  }
  removeParticipant(){
    this.participants.pop();
  }
  approve() {
    console.log("works");
  }


}
