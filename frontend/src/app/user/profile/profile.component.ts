import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/model/user";
import {UserService} from "../../shared/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.userService.getUserByID(+params['id']).subscribe(
              user => {
                  this.user = user;
              },
              error => {/*todo: resolve error case*/
              },
              () => {
              }
          );
      });
  }

}
