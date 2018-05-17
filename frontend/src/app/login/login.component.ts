import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  user_username:string;
  user_password:string;

  constructor(private api:ApiService) { 
    
  }

  ngOnInit() {
    
  }

  login(){
    console.log(this.user_password, this.user_username);
    this.api.login(this.user_username, this.user_password).subscribe(
      data =>{console.log(data)},
      err =>{console.log(err)},
      () =>{console.log('donezo')}
    );
  }

}
