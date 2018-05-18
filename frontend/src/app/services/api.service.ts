import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

/**
 * Communicates with API endpoints.
 */
@Injectable()
export class ApiService {


  constructor(private http:HttpClient) { }

  login(user_username:string, user_password:string){
    let body = JSON.stringify({user_username, user_password});
    return this.http.get('localhost:8000/getusersunsafe', httpOptions);
  }
}
