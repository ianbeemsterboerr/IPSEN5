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
        console.log('Received data: '+data);
        let result = data['bearer'];
        localStorage.removeItem('token');
        localStorage.setItem('token', result);
      },
      err =>{console.log('error: '+err)},
      () =>{console.log('donezo')}
    );
    /*
    For testing purposes:
    */
    console.log('Localstorage bearer: '+localStorage.getItem('token'));
    this.api.getUsers().subscribe(
      data =>{
        console.log(data);
      }, err=>{
        console.log(err);
      }, ()=>{
        console.log('Users succesvol geget.')
      }
    )
  }

}
