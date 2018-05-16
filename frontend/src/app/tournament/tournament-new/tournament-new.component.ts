import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-tournament-new',
  templateUrl: './tournament-new.component.html',
  styleUrls: ['./tournament-new.component.css']
})
export class TournamentNewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  submitForm() {
    const values = document.getElementById('form');
    console.log('Submitting tournament: ' + values[0].value);
  }

}
