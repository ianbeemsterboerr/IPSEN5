import { Injectable } from '@angular/core';

@Injectable()
export class ActiveaccountService {
  public isLoggedIn:boolean = false;
  constructor() { }

  public setLoggedIn(value:boolean){
    this.isLoggedIn = value;
  }

  public getActiveUserId(){
    if (!this.isLoggedIn)
    {
      return null;
    }
    else
    {
      return localStorage.getItem('activeUserId');
    }
  }

  public getActiveUser(){
    if (!this.isLoggedIn)
    {
      return null;
    }
    else
    {
      return localStorage.getItem('activeUser');
    }
  }
}
