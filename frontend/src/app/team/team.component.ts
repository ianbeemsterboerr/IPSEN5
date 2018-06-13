import { Component, OnInit } from '@angular/core';
import { Team } from '../shared/model/team';
import { ApiService } from '../shared/api.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(private api: ApiService) {
   }
   
   newTeam = new Team(
    null,
    parseInt(localStorage.getItem('activeUserId')),
    null,
    null,
    null,
    null,
    null
  );
  teamForm: FormGroup;

  ngOnInit() {
    this.teamForm = new FormGroup({
      'name': new FormControl(this.newTeam.name),
      'invitecode': new FormControl(this.newTeam.invitecode),
  });
  console.log(this.newTeam); 
  }

  submitForm(){      
     this.api.post('tournament/apply', this.newTeam).subscribe();  
     console.log(this.newTeam);   
  }

}

//public id: number,
//public leader_user_id: number,
//public name: string,
//public size: number,
//public max_size: number,
//public team_members: TeamMember[],
//public team_leader?: User