import { Injectable } from '@angular/core';

@Injectable()
export class ActiveaccountService {
  public loggedIn:boolean = false;

  constructor() {
    this.checkLoggedIn();
   }

   public isLoggedIn(){
    if(this.loggedIn){
      return true;
    }
    else{
      return false;
    }
   }
  public setLoggedIn(value:boolean){
    this.loggedIn = value;
  }
  public checkLoggedIn(){
    if(!localStorage.getItem('activeUserId')){
      this.loggedIn = false;
    }
    else{
      this.loggedIn = true;
    }
  }

  public getActiveUserId(){
    if (!this.loggedIn)
    {
      return null;
    }
    else
    {
      return localStorage.getItem('activeUserId');
    }
  }

  public getActiveUser(){
    if (!this.loggedIn)
    {
      return null;
    }
    else
    {
      return localStorage.getItem('activeUser');
    }
  }
}
