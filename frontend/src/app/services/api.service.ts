import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiAddress = 'localhost:8000';
/**
 * Communicates with API endpoints.
 */
@Injectable()
export class ApiService {


  constructor(private http:HttpClient) { }

  login(user_username:string, user_password:string){
    let authHeaders = new HttpHeaders({'user_username' :  user_username, 'user_password': user_password})
    return this.http.post(apiAddress+'/login', httpOptions)
  }
}
