import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart/cart-service.service';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';
import axios from "axios";
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  products :product |any;
  showCreditCard: boolean = true;
  mtrlArr:any = [];
  qtyArr:any =[];
  showCashOnDelivery: boolean = false;
  showBankTransfer: boolean = false;
  @ViewChild('creditCard') creditCard: ElementRef | any;
  @ViewChild('bankTransfer') bankTransfer: ElementRef | any;


  loadedUser: User = JSON.parse(localStorage.getItem('userData') || '{}');

  showUserDetails?: boolean;
  showPayment?: boolean;
  totalPrice: number = 0;
  answer:string ="";
  constructor(private cartService: CartServiceService, private authService: AuthService,private router: Router, private renderer: Renderer2) { }

  async ngOnInit() {
    let resData= await axios.post("https://perlarest.vinoitalia.gr/php-auth-api/fetchCartItems.php",{
      trdr:this.loadedUser.trdr
    })
   this.products = resData.data.products

    this.cartService.shouldContinue.next(true);
    // console.log(JSON.parse(localStorage.getItem('userData') || '{}'));

    for(let product of this.products){
      this.totalPrice += (product.wholesale * product.qty);
    }
    console.log(this.totalPrice);

    if(!this.showUserDetails){
      this.showUserDetails = true;
    }

    if(!this.showPayment){
      this.showPayment = false;
    }

    if(localStorage.getItem('showUserDetails') && localStorage.getItem('showPayment')){
      if(localStorage.getItem('showUserDetails') == 'true'){
        this.showUserDetails = true;
        this.showPayment = false;
      }
      else{
        this.showUserDetails = false;
        this.showPayment = true;
      }
    }

    // this.showUserDetails = localStorage.getItem('showUserDetails') == 'true'? true : false;
    // this.showPayment = localStorage.getItem('showPayment') == 'true'? true : false;
  }

  handleGoBackToCart(){
    this.router.navigate(['cart']);
  }

  handleGoBackToUserDetails(){
    this.showUserDetails = true;
    this.showPayment = false;

    localStorage.setItem('showUserDetails', 'true');
    localStorage.setItem('showPayment', 'false');
  }


  handleUserDetails(f: NgForm){
    this.showUserDetails = false;
    this.showPayment = true;

    localStorage.setItem('showUserDetails', 'false');
    localStorage.setItem('showPayment', 'true');
  }

  handlePaymentMethod(el: HTMLAnchorElement){
    if(el.innerHTML == 'Credit Card'){
      this.showCreditCard = true;
      this.showBankTransfer = false;


      el.style.fontWeight = 'bold';
      el.style.textDecoration = 'underline';
      el.style.transition = 'all 0.3s ease';

      this.renderer.setStyle(this.bankTransfer.nativeElement, 'font-weight', 'normal');
      this.renderer.setStyle(this.bankTransfer.nativeElement, 'text-decoration', 'none');
    }



    if(el.innerHTML == 'Bank Transfer'){
      this.showCreditCard = false;
      this.showBankTransfer = true;

      el.style.fontWeight = 'bold';
      el.style.textDecoration = 'underline';
      el.style.transition = 'all 0.3s ease';

      this.renderer.setStyle(this.creditCard.nativeElement, 'font-weight', 'normal');
      this.renderer.setStyle(this.creditCard.nativeElement, 'text-decoration', 'none');


    }
  }

  ngOnDestroy(): void {

  }
  placeOrder(){
    console.log(this.products)
   for(let i =0;i<this.products.length;i++){
     this.mtrlArr[i] = this.products[i].mtrl;
     this.qtyArr[i]  = this.products[i].qty
   }
    console.log(this.mtrlArr)
    console.log(this.mtrlArr.join(","));
    console.log(this.qtyArr);
    console.log(this.qtyArr.join(","))
    console.log(this.loadedUser.trdr)
    let payment;
    if(this.showPayment){
       payment = 2
    }
    axios.post("https://perlarest.vinoitalia.gr//php-auth-api/placeOrder.php/",{
        mtrl: this.mtrlArr.join(","),
        qty : this.qtyArr.join(","),
        trdr: this.loadedUser.trdr,
        payment: payment


    }).then(resData=>{
      setTimeout(()=>{
        this.answer = resData.data.message
        setTimeout(()=>{
         this.products= this.cartService.clearCart();
         let loadedUser = JSON.parse(localStorage.getItem("userData")|| '{}');
         axios.post("https://perlarest.vinoitalia.gr/php-auth-api/removeCartItem.php",
         {
           mtrl:"item",
           trdr:loadedUser.trdr,
           id:1
         }
         )
          this.router.navigate(['home'])

        },3000)
      },3000)

    })

  }


}
