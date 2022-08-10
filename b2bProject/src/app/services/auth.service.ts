import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, reduce, tap } from "rxjs/operators";
import { User } from './user.model';

export interface AuthResponseData{
  kind: string;
  token: string;
  idToken: string;
  username: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  success: number;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new Subject<boolean>();
  cast = this.loggedIn.asObservable();
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

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

  login(username: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://testdatabaseconection.whouse.gr/php-auth-api/login.php',
      {
        name: username,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.username,resData.localId,resData.token,600);
      })
    );
  }

  logout(){
    this.user.next(null);
    // console.log("hello");
    console.log(JSON.parse(localStorage.getItem('userData') || '{}'));
    this.router.navigate(['log-in']);

    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin(){


    const userData: {
      username: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if(!userData){
      return;
    }else{
      let expiresIn = 600;
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000 * 6);
      console.log(expirationDate);

      const user = new User(userData.username, userData.id, userData._token , expirationDate);
      this.user.next(user);
      // this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
    }

    const loadedUser = new User(userData.username,userData.id,userData._token, new Date(userData._tokenExpirationDate));

    console.log(new Date().getTime());


    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      console.log(expirationDuration);


      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number){
    console.log(expirationDuration/6000);
    console.log(JSON.parse(localStorage.getItem('userData') || '{}'));
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured!';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'username_EXISTS':
        errorMessage = 'This username already exists.';
        break;
      case 'username_NOT_FOUND':
        errorMessage = 'This username does not exists.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(username: string, userId: string, token: string, expiresIn: number){

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000 * 6);
    console.log(expirationDate);

    const user = new User(username, userId, token , expirationDate);
    this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogin();

  }
}











