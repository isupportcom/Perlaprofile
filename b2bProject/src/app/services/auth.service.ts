import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new Subject<boolean>();
  cast = this.loggedIn.asObservable();

  sendLoggedIn(flag: boolean){
    this.loggedIn.next(flag);
  }

  isAuth:boolean = false;
  isAdmin:boolean = false;
 setAuthentication(value:boolean){
   this.isAuth = value;
 }
getAuthentication():boolean
{
  return this.isAuth;
}
  setAdmin(value:boolean){
    this.isAdmin = value;
  }
  getAdmin():boolean{
   return this.isAdmin;
  }




  constructor() { }
}








