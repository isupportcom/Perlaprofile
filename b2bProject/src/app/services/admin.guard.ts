import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {map, take} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user?.token;
        console.log(isAuth);
        console.log(this.authService.getAdmin())

        if(this.authService.getAdmin()){
          return true;
        }
        else{

          return this.router.createUrlTree(['home']);
        }

      }),
      // tap(isAuth => {
      //     if(!isAuth){
      //         this.router.navigate(['']);
      //     }
      // })
    );
  }
}
