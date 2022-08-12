import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart/cart-service.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  

  constructor(private cartService: CartServiceService, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.cartService.shouldContinue.next(true);
  }

  ngOnDestroy(): void {
    
  }
  

}
