import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart/cart-service.service';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  products = JSON.parse(<string>localStorage.getItem("products"));
  showCreditCard: boolean = true;
  showCashOnDelivery: boolean = false;
  showBankTransfer: boolean = false;
  @ViewChild('creditCard') creditCard: ElementRef | any;
  @ViewChild('cashOndelivery') cashOndelivery: ElementRef | any;
  @ViewChild('bankTransfer') bankTransfer: ElementRef | any;

  loadedUser: User = JSON.parse(localStorage.getItem('userData') || '{}');

  constructor(private cartService: CartServiceService, private authService: AuthService,private router: Router, private renderer: Renderer2) { }
  
  ngOnInit(): void {  
    this.cartService.shouldContinue.next(true);
    // console.log(JSON.parse(localStorage.getItem('userData') || '{}'));
    console.log(this.loadedUser.address);
    
    
  }

  handlePaymentMethod(el: HTMLAnchorElement){
    if(el.innerHTML == 'Credit Card'){
      this.showCreditCard = true;
      this.showCashOnDelivery = false;
      this.showBankTransfer = false;
      

      el.style.fontWeight = 'bold';
      el.style.textDecoration = 'underline';
      el.style.transition = 'all 0.3s ease';

      this.renderer.setStyle(this.cashOndelivery.nativeElement, 'font-weight', 'normal');
      this.renderer.setStyle(this.cashOndelivery.nativeElement, 'text-decoration', 'none');

      this.renderer.setStyle(this.bankTransfer.nativeElement, 'font-weight', 'normal');
      this.renderer.setStyle(this.bankTransfer.nativeElement, 'text-decoration', 'none');
    }
    
    if(el.innerHTML == 'Cash On Delivery'){
      this.showCreditCard = false;
      this.showCashOnDelivery = true;
      this.showBankTransfer = false;

      el.style.fontWeight = 'bold';
      el.style.textDecoration = 'underline';
      el.style.transition = 'all 0.3s ease';

      this.renderer.setStyle(this.creditCard.nativeElement, 'font-weight', 'normal');
      this.renderer.setStyle(this.creditCard.nativeElement, 'text-decoration', 'none');

      this.renderer.setStyle(this.bankTransfer.nativeElement, 'font-weight', 'normal');
      this.renderer.setStyle(this.bankTransfer.nativeElement, 'text-decoration', 'none');

    }
    
    if(el.innerHTML == 'Bank Transfer'){
      this.showCreditCard = false;
      this.showCashOnDelivery = false;
      this.showBankTransfer = true;

      el.style.fontWeight = 'bold';
      el.style.textDecoration = 'underline';
      el.style.transition = 'all 0.3s ease';

      this.renderer.setStyle(this.creditCard.nativeElement, 'font-weight', 'normal');
      this.renderer.setStyle(this.creditCard.nativeElement, 'text-decoration', 'none');

      this.renderer.setStyle(this.cashOndelivery.nativeElement, 'font-weight', 'normal');
      this.renderer.setStyle(this.cashOndelivery.nativeElement, 'text-decoration', 'none');

    }
  }

  ngOnDestroy(): void {
    
  }
  

}
