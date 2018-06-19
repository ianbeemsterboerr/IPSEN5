import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/model/user';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  public password_repeat: string;
  public user: User;


  constructor(private userService: UserService) {
    this.user = new User(null, null, null, null, null, null, null, null, null);
   }

  ngOnInit() {

  }

  onSubmit() {
    this.userService.register(this.user);
  }

}
