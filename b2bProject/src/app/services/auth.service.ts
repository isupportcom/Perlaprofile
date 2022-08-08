import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';
import { Observable } from 'rxjs';
// import { user } from '../log-in/log-in.component';
import { User } from './user.model';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';

export interface AuthResponseData{
  kind: string;
  idToken: string;
  username: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  loggedIn = new Subject<boolean>();
  cast = this.loggedIn.asObservable();
  private tokenExpirationTimer: any;
  // user?: user;

  constructor(private http: HttpClient, private router:Router) { }

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


login(username: string, password:string){

  return this.http.post<AuthResponseData>(
    "https://testdatabaseconection.whouse.gr/",{
      id: 3,
      username: username,
      password: password,
      retrunSecureToken: true
    }
  ).pipe(catchError(this.handleError), tap(resData => {
    console.log(resData)
    this.handleAuthentication(resData.username,resData.localId,resData.idToken,+resData.expiresIn)
  }))
}

private handleAuthentication(username: string, userId: string, token: string, expiresIn: number){
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(username, userId, token , expirationDate);
  this.user.next(user);
  // this.autoLogout(expiresIn * 1000);
  localStorage.setItem('userData', JSON.stringify(user));
}

private handleError(errorRes: HttpErrorResponse){
  let errorMessage = 'An unknown error occured!';
  if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
  }
  switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists.';
          break;
      case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exists.';
          break;
      case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct.';
          break;
      }
  return throwError(errorMessage);
}

autoLogin(){
  const userData: {
   email: string,
   id: string,
   _token: string,
   _tokenExpirationDate: string
  } = JSON.parse(localStorage.getItem('userData') || '{}');
  if(!userData){
       return;
  }

  const loadedUser = new User(userData.email,userData.id,userData._token, new Date(userData._tokenExpirationDate));

  if(loadedUser.token){
       this.user.next(loadedUser);
       const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
       this.autoLogout(expirationDuration);
  }
}

autoLogout(expirationDuration: number){
  this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
  }, expirationDuration);
}

logout(){
  this.user.next(null);

  this.router.navigate(['/log-in']);
  localStorage.removeItem('userData');
  if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
  }
  this.tokenExpirationTimer = null;
}




}








