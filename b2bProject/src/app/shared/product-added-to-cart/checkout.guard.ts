import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CartServiceService } from "src/app/cart/cart-service.service";
import { map, take, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
    flag: boolean | any;
    products = JSON.parse(<string>localStorage.getItem("products") )
    length = this.products.length;
    constructor(private cartService: CartServiceService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree > {
        let flag;
        return this.cartService.shouldContinue.pipe(
            take(1),
            map(res => {
                if(res || (this.length > 0)){
                    return true;
                }
                else{
                    return this.router.createUrlTree(['cart']);
                }
            })
        );
    }
}