import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, reduce, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  token: string;
  idToken: string;
  username: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  success: number;
  address: string;
  afm: string;
  city: string;
  doy: string;
  name: string;
  phone01: string;
  phone02: string;
  zip: string;
  registered?: boolean;
  isAdmin: number;
  area_id: number;
  trdr: number;
  email: string;
  emporiki_katigoria: string;
  geografiki_zoni: string;
  metaforeas: string;
  dromologio: string;
  metaforiko_meso: string;
  tropos_apostolis: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new Subject<boolean>();
  cast = this.loggedIn.asObservable();
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  sendLoggedIn(flag: boolean) {
    this.loggedIn.next(flag);
  }

  isAuth: boolean = false;
  isAdmin: boolean = false;
  setAuthentication(value: boolean) {
    this.isAuth = value;
  }
  getAuthentication(): boolean {
    return this.isAuth;
  }
  setAdmin(value: boolean) {
    this.isAdmin = value;
  }
  getAdmin(): boolean {
    return this.isAdmin;
  }

  login(username: string, password: string) {
    console.log(username);
    console.log(password);
    return this.http
      .post<AuthResponseData>(
        'https://perlanoderest.vinoitalia.gr/auth/login',
        {
          name: username,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          console.log(resData);

          if (resData.isAdmin == 0) {
            localStorage.setItem('username', resData.name);
            this.setAdmin(false);
            console.log(resData.trdr);
          } else {
            localStorage.setItem('username', 'Admin');
            this.setAdmin(true);
          }

          this.handleAuthentication(
            resData.username,
            resData.localId,
            resData.token,
            600,
            resData.address,
            resData.afm,
            resData.city,
            resData.doy,
            resData.name,
            resData.phone01,
            resData.phone02,
            resData.zip,
            resData.trdr,
            resData.email,
            resData.emporiki_katigoria,
            resData.geografiki_zoni,
            resData.metaforeas,
            resData.dromologio,
            resData.metaforiko_meso,
            resData.tropos_apostolis,
            resData.area_id
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    // console.log("hello");
    console.log(JSON.parse(localStorage.getItem('userData') || '{}'));

    localStorage.removeItem('upokatastima');
    localStorage.removeItem('userData');
    localStorage.removeItem('username');
    localStorage.removeItem('lang');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    window.location.reload();
  }

  autoLogin() {
    const userData: {
      username: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      address: string;
      afm: string;
      city: string;
      doy: string;
      eponimia: string;
      phone1: string;
      phone2: string;
      zip: string;
      trdr: number;
      email: string;
      emporiki_katigoria: string;
      geografikh_zwnh: string;
      metaforeas: string;
      dromologio: string;
      metaforiko_meso: string;
      tropos_apostolis: string;
      area_id: number;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    } else {
      let expiresIn = 600;
      const expirationDate = new Date(
        new Date().getTime() + expiresIn * 1000 * 6
      );
      console.log(expirationDate);

      const user = new User(
        userData.username,
        userData.id,
        userData._token,
        expirationDate,
        userData.address,
        userData.afm,
        userData.city,
        userData.doy,
        userData.eponimia,
        userData.phone1,
        userData.phone2,
        userData.zip,
        userData.trdr,
        userData.email,
        userData.emporiki_katigoria,
        userData.geografikh_zwnh,
        userData.metaforeas,
        userData.dromologio,
        userData.metaforiko_meso,
        userData.tropos_apostolis,
        userData.area_id
      );
      this.user.next(user);
      // this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
    }

    const loadedUser = new User(
      userData.username,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.address,
      userData.afm,
      userData.city,
      userData.doy,
      userData.eponimia,
      userData.phone1,
      userData.phone2,
      userData.zip,
      userData.trdr,
      userData.email,
      userData.emporiki_katigoria,
      userData.geografikh_zwnh,
      userData.metaforeas,
      userData.dromologio,
      userData.metaforiko_meso,
      userData.tropos_apostolis,
      userData.area_id
    );

    console.log(new Date().getTime());

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      console.log(expirationDuration);

      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration / 6000);
    console.log(JSON.parse(localStorage.getItem('userData') || '{}'));
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
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

  private handleAuthentication(
    username: string,
    userId: string,
    token: string,
    expiresIn: number,
    address: string,
    afm: string,
    city: string,
    doy: string,
    eponimia: string,
    phone1: string,
    phone2: string,
    zip: string,
    trdr: number,
    email: string,
    emporiki_katigoria: string,
    geografikh_zwnh: string,
    metaforeas: string,
    dromologio: string,
    metaforiko_meso: string,
    tropos_apostolis: string,
    area_id: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000 * 6
    );
    console.log(expirationDate);

    const user = new User(
      username,
      userId,
      token,
      expirationDate,
      address,
      afm,
      city,
      doy,
      eponimia,
      phone1,
      phone2,
      zip,
      trdr,
      email,
      emporiki_katigoria,
      geografikh_zwnh,
      metaforeas,
      dromologio,
      metaforiko_meso,
      tropos_apostolis,
      area_id
    );
    this.user.next(user);
    console.log(user);
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));

    this.autoLogin();
  }
}
