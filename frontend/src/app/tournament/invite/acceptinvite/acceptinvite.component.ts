import { ErrorhandlerService } from './../../../shared/errorhandler.service';
import { HttpParams } from '@angular/common/http';
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
  public teamId;

  constructor(private errorHandler: ErrorhandlerService, private route: ActivatedRoute, private api: ApiService) {
    this.route.queryParams.subscribe(params => {
      this.userId = params['user'];
      this.tournamentId = params['tournament'];

      this.api.get('teams/getidbyuserid/' + this.userId).subscribe(
        data => {
          this.teamId = data;
        },
        err => {
          this.errorHandler.handleError(err);
        }
      );
  });
  }

  ngOnInit() {}



  acceptInvite() {

    this.api.get('tournament/enroll/' + this.tournamentId + '/' + this.teamId).subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log(err);
      }
    );

  }

}
