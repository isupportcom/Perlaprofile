import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";
import { AuthService } from '../services/auth.service';
import {CartServiceService} from "./cart-service.service";
import axios from "axios";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  @ViewChild('text') text: ElementRef | undefined;
  products :product[] |any;
  GrandTotal:number=0;
  wholesale:number=0;
  length:number|any
  show: boolean = true;
  shouldContinue?: boolean;
  goToCheckout?: boolean;
  flag?: boolean = this.cartService.flag;



  @Input('quantityInput') quantityInput?: ElementRef;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private cartService : CartServiceService
    ) { }

  ngOnInit(): void {
    console.log(this.cartService.getItemsToCartArray())

    // console.log(JSON.parse(localStorage.getItem("products") || '{}'))
    console.log(this.cartService.getItems());
    let loadedUser = JSON.parse(localStorage.getItem("userData") || '{}')
   axios.post("https://perlarest.vinoitalia.gr/php-auth-api/fetchCartItems.php",{trdr:loadedUser.trdr})
    .then(
      (resData:any)=>{
        console.log(resData);
        this.products = resData.data.products
        this.length = this.products.length;

        if(this.length == 0){
          this.shouldContinue = false;
        }
        else{
          this.shouldContinue = true;
        }
        this.cartService.shouldContinue.next(this.shouldContinue);

        for(let prod of this.products){
          this.GrandTotal += +prod.wholesale *prod.qty;
        }
        console.log(this.GrandTotal)
      }
      );





  }
  currentQuantity(quantity:any,index:number,prevQuantity:number) {
    // if (quantity > prevQuantity){
    //   this.GrandTotal = (this.GrandTotal + (this.products[index].wholesale * quantity)) - this.products[index].wholesale * prevQuantity;
    // }else{
    //   this.GrandTotal = (this.GrandTotal - (this.products[index].wholesale * quantity)) + this.products[index].wholesale * prevQuantity;
    // }
    // console.log(quantity);
    // console.log(prevQuantity);
    this.products[index].qty = quantity;

    window.location.reload();


  }


  removeOne(item: any, index: number){

      if(this.length > 1){
        this.GrandTotal -= this.products[index].wholesale;
      }
      else{
        this.GrandTotal = 0;
      }
        console.log(item);

        let loadedUser = JSON.parse(localStorage.getItem("userData")|| '{}');
        axios.post("https://perlarest.vinoitalia.gr/php-auth-api/removeCartItem.php",
        {
          mtrl:item.mtrl,
          trdr:loadedUser.trdr,
          id:2,
          group_id: item.group_id
        }
        ).then(resData=>{console.log(resData);
          console.log(this.products)
          this.length = this.products.length;
          setTimeout(() => {
            window.location.reload();
          }, 500)
        })




  }



  clearAll(item:any){
    let loadedUser = JSON.parse(localStorage.getItem("userData")|| '{}');
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/removeCartItem.php",
    {
      mtrl:item,
      trdr:loadedUser.trdr,
      id:1
    }
    ).then(resData=>{console.log(resData);

      this.GrandTotal = 0 ;
      this.length = 0;
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/fetchCartItems.php",{trdr:loadedUser.trdr})
    .then(
      (resData:any)=>{
        console.log(resData);
        this.products = resData.data.products

      })


    })
    setTimeout(() => {
      window.location.reload();
    }, 500)

  }

  handleCheckout(){
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/updateStock.php",{
      method:"STOCKUPDATE"
    }).then(resData=>{
      console.log(resData.data);
      this.router.navigate(['checkout']);
    })


  }

  handleMouseOver(){
    this.renderer.setStyle(this.text?.nativeElement, 'font-weight', 'normal');
  }

  handleMouseLeave(){
    this.renderer.setStyle(this.text?.nativeElement, 'font-weight', 'lighter');
  }

  handleClick(){
    let currentCategory = JSON.parse(localStorage.getItem('currentCategory') || '{}')
    console.log(currentCategory);

    this.router.navigate(['products',currentCategory.id,currentCategory.name]);
  }


  ngOnDestroy(): void {
  }

}
