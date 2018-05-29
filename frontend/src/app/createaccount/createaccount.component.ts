import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { User } from '../shared/model/user';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  private user_username:string;
  private user_password:string;
  private user_password_repeat:string;
  private user_email:string;
  private user_first_name:string;
  private user_last_name:string;

  public user:User;
  
  constructor(private api: ApiService) {
    this.user = new User(null, null, null, null, null, null, null, null)
   }

  register(){
    if(this.user.password.length > 0){    //TODO: better client-side validation.
      //this.user = new User(user_username, user_first_name, user_last_name, user_password, user_email, null, null, false);
      this.api.post('users/register', this.user).subscribe(
        data=>{
          console.log(data);
        }, err=>{ 
          console.log(err);
        }, ()=>{

        }
      )
    }
    else{

    }

  }

  ngOnInit() {
  }

}
