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
    this.api.login(this.user_username, this.user_password).subscribe(
      data =>{
        let result = data['bearer'];
        localStorage.removeItem('token');
        localStorage.setItem('token', result);
      },
      err =>{console.log(err)},
      () =>{console.log('donezo')}
    );
    console.log(localStorage.getItem('token'));

    console.log(this.api.getUsers());
  }

}
