import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',})
};
const apiAddress = 'http://localhost:8000';
/**
 * Communicates with API endpoints.
 */
@Injectable()
export class ApiService {


  constructor(private http:HttpClient) { }

  login(user_username:string, user_password:string){
    let body = {user_username, user_password};
    return this.http.post(apiAddress + '/login', body, httpOptions);
  }
}
