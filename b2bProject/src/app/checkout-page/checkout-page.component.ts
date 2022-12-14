import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart/cart-service.service';
import { User } from '../services/user.model';
import axios from 'axios';
import { product } from '../AdminArea/adminareaproducts/adminareaproducts.component';
import RevolutCheckout from '@revolut/checkout';


@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  products: product | any;
  showCreditCard: boolean = true;
  mtrlArr: any = [];
  qtyArr: any = [];
  answer:string = "";
  canGoBackToHome:boolean = false;
  showCashOnDelivery: boolean = false;
  showBankTransfer: boolean = false;
  @ViewChild('creditCard') creditCard: ElementRef | any;
  @ViewChild('bankTransfer') bankTransfer: ElementRef | any;
  GrandTotal:number=0;
  discArr: any = [];
  loadedUser: User | any;

  trigwnikh: boolean = true;
  FormData: FormGroup |any;
  BankData: FormGroup |any;
  showUserDetails?: boolean;
  showPayment?: boolean;
  totalPrice: number = 0;
  showBankCredentials: boolean = false;

  constructor(
    private cartService: CartServiceService,
    private router: Router,
    private renderer: Renderer2,
    private builder: FormBuilder
  ) {}

  async ngOnInit() {
    
    this.loadedUser = JSON.parse(localStorage.getItem('userData') || '{}');
    
    this.FormData = this.builder.group({
      address: [{value: this.loadedUser.address, disabled: true}],
      zipCode: [{value: this.loadedUser.zip, disabled: true}],
      area: [{value: this.loadedUser.area, disabled: true}],
      city: [{value: this.loadedUser.city, disabled: true}],
    })

    this.BankData = this.builder.group({
      address: [{value: this.loadedUser.address, disabled: false}],
      zipCode: [{value: this.loadedUser.zip, disabled: false}],
      area: [{value: this.loadedUser.area, disabled: false}],
      city: [{value: this.loadedUser.city, disabled: false}],
    })
    

    let resData = await axios.post(
      'https://perlarest.vinoitalia.gr/php-auth-api/fetchCartItems.php',
      {
        trdr: this.loadedUser.trdr,
      }
    );

    this.products = resData.data.products;
    console.log(this.products);
    for(let prod of this.products){
      this.GrandTotal += +prod.wholesale *prod.qty;
    }
    this.GrandTotal = +this.GrandTotal.toFixed(4)
    this.cartService.shouldContinue.next(true);
    // console.log(JSON.parse(localStorage.getItem('userData') || '{}'));

    for (let product of this.products) {
      this.totalPrice += product.wholesale * product.qty;
    }
    console.log(this.totalPrice);

    if (!this.showUserDetails) {
      this.showUserDetails = true;
    }

    if (!this.showPayment) {
      this.showPayment = false;
    }

    if (
      localStorage.getItem('showUserDetails') &&
      localStorage.getItem('showPayment')
    ) {
      if (localStorage.getItem('showUserDetails') == 'true') {
        this.showUserDetails = true;
        this.showPayment = false;
      } else {
        this.showUserDetails = false;
        this.showPayment = true;
      }
    }

    // this.showUserDetails = localStorage.getItem('showUserDetails') == 'true'? true : false;
    // this.showPayment = localStorage.getItem('showPayment') == 'true'? true : false;
  }

  onSubmit2(){
    this.router.navigate(['order-completed'])
    
  }

  onSubmit(FormData:any) {
    console.log(FormData)
    this.placeOrder();
  }

  bankCredentials(showCredentials: boolean,row?: any){

    
    if(showCredentials){
      this.showBankCredentials = false;
    }
    else{
      this.showBankCredentials = true;
    }
    
  }

  handleTrigwnikh(event: any){
    if(this.trigwnikh){
      this.FormData.controls['address'].enable();
      this.FormData.controls['zipCode'].enable();
      this.FormData.controls['area'].enable();
      this.FormData.controls['city'].enable();
      this.trigwnikh = false;
    } 
    else{
      this.FormData.controls['address'].disable();
      this.FormData.controls['zipCode'].disable();
      this.FormData.controls['area'].disable();
      this.FormData.controls['city'].disable();
      this.trigwnikh = true;
    }
  }

  handleGoBackToCart() {
    this.router.navigate(['cart']);
  }

  handleGoBackToUserDetails() {
    this.showUserDetails = true;
    this.showPayment = false;

    localStorage.setItem('showUserDetails', 'true');
    localStorage.setItem('showPayment', 'false');
  }

  handleUserDetails(f: NgForm) {
    console.log(f.value);
    

    localStorage.setItem('showUserDetails', 'false');
    localStorage.setItem('showPayment', 'true');
  }

  handlePaymentMethod(el: HTMLAnchorElement) {
    if (el.innerHTML == 'Credit Card') {
      this.showCreditCard = true;
      this.showBankTransfer = false;

      el.style.fontWeight = 'bold';
      el.style.textDecoration = 'underline';
      el.style.transition = 'all 0.3s ease';

      this.renderer.setStyle(
        this.bankTransfer.nativeElement,
        'font-weight',
        'normal'
      );
      this.renderer.setStyle(
        this.bankTransfer.nativeElement,
        'text-decoration',
        'none'
      );
    }

    if (el.innerHTML == 'Bank Transfer') {
      this.showCreditCard = false;
      this.showBankTransfer = true;

      el.style.fontWeight = 'bold';
      el.style.textDecoration = 'underline';
      el.style.transition = 'all 0.3s ease';

      this.renderer.setStyle(
        this.creditCard.nativeElement,
        'font-weight',
        'normal'
      );
      this.renderer.setStyle(
        this.creditCard.nativeElement,
        'text-decoration',
        'none'
      );
    }
  }

  ngOnDestroy(): void {}
  goToOrder: boolean = false;
  float2int(value: number) {
    return value | 0;
  }
  async placeOrder() {
    setTimeout(()=>{
      this.canGoBackToHome = true;
    },1000)

    var goToOrder: any;
    let price = this.float2int(this.GrandTotal * 100);
    
    let req = await axios
      .post('https://perlarest.vinoitalia.gr/php-auth-api/checkout.php', {
        amount: price,
        currency: 'EUR',
        email: 'johndoe001@gmail.com',
      })


        console.log(req.data.data.public_id);
        let prod = this.products;
        let answer = "";
        let mtrlArr: any = [];
        let qtyArr :any = [];
        let discArr:any = [];
        let route = this.router;
        let loadedUser = this.loadedUser
        // let cardElementRef = useRef(null);
        // await RevolutCheckout(req.data.data.public_id).then(RC => {
        //   console.log(RC);
        //   RC.createCardField({
        //     target: cardElementRef
        //   })
        // })


        let checkout = await RevolutCheckout(req.data.data.public_id)

        checkout.payWithPopup({
            name: 'John Smith',
            email: 'customer@example.com',
            phone: '+447950630319',
            locale: 'en',
            billingAddress: {
              countryCode: 'GB',
              region: 'Greater London',
              city: 'London',
              streetLine1: 'Revolut',
              streetLine2: '1 Canada Square',
              postcode: 'EC2V 6DN',
              
            },
            shippingAddress: {
              countryCode: 'GB',
              region: 'Greater London',
              city: 'London',
              streetLine1: 'Revolut',
              streetLine2: '1 Canada Square',
              postcode: 'EC2V 6DN',
            },
            onSuccess() {
            for (let i = 0; i < prod.length; i++) {
              mtrlArr[i] = prod[i].mtrl;
              qtyArr[i] = prod[i].qty;
              discArr[i] =prod[i].discount;
            }
            console.log(mtrlArr);
            console.log(mtrlArr.join(','));
            console.log(qtyArr);
            console.log(qtyArr.join(','));

            console.log(loadedUser.trdr);
            let payment;

              payment = 2;

            axios
              .post(
                'https://perlarest.vinoitalia.gr//php-auth-api/placeOrder.php/',
                {
                  mtrl: mtrlArr.join(','),
                  qty: qtyArr.join(','),
                  trdr: loadedUser.trdr,
                  discount: discArr.join(','),
                  payment: payment,
                }
              )
              .then((resData) => {
                let h3 :any
                   h3 = document.getElementById("orderComplete");
                  h3.innerHTML = resData.data.message  + "Click The button to navigate to Homepage or you will navigate in 10 seconds";
                  setTimeout(()=>{
                    route.navigate(['home'])
                    setTimeout(()=>{
                      window.location.reload();
                    })
                  },10000)


              });
            },

             onCancel() {
              let btn :any;
              btn = document.getElementById("toHomepage")
              btn.remove()
              window.location.reload();
            },

             onError(message) {
              window.alert("Something Went Wrong");
            }
          }

          );







  }
  handleMyHomePage(){
    this.router.navigate(['home']);
  }
}
