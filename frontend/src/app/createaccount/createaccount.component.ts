import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { User } from '../shared/model/user';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  public password_repeat:string;
  public user:User;
  
  
  constructor(private api: ApiService) {
    this.user = new User(null, null, null, null, null, null, null, null)
   }

  register(){
      this.api.post('users/register', this.user).subscribe(
        data=>{
          console.log(data);
        }, err=>{ 
          console.log(err);
        }, ()=>{

        }
      )

  }

  ngOnInit() {
    
  }

  onSubmit(){
    this.register();
  }

}
