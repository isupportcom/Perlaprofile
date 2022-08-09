import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, reduce, tap } from "rxjs/operators";
import { User } from './user.model';

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
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

  constructor(private http: HttpClient) { }

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
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
      })
    );
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

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token , expirationDate);
    this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }


}








