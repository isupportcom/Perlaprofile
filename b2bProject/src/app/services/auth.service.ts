import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usernameChanged = new Subject<string>();

  username = '';
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

  
  getUsername() : string {
    return this.username; 
  }

  setUsername(username: string){
    this.username = username;
    // this.usernameChanged.next(this.username);
    localStorage.setItem("username", username);
  }
  

  constructor() { }
}



