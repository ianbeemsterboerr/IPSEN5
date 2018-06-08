import { User } from './../../../shared/model/user';
import { ApiService } from './../../../shared/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceptinvite',
  templateUrl: './acceptinvite.component.html',
  styleUrls: ['./acceptinvite.component.css']
})
export class AcceptinviteComponent implements OnInit {
  public userId;
  public tournamentId;

  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.route.queryParams.subscribe(params => {
      this.userId = params['user'];
      this.tournamentId = params['tournament'];
  });
  }

  ngOnInit() {}



  acceptInvite() {
    const body = {user: this.userId, tournament: this.tournamentId };
    this.api.post('tournament/acceptinvite', body).subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log(err);
      }
    );

  }

}
