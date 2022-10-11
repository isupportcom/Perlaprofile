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
  waiting: boolean = false;
  temp: any;
  cartItems: Array<Array<any>> = [];


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
        this.temp = this.products
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

      

      setTimeout(() => {
        let counter = 0;
        let temp: any;
        for(let i=0;i<this.products.length;i++){
          if(i === 0){
            this.cartItems.push([]);
            // this.cartItems[i].push([]);
            this.cartItems[counter].push(this.products[i]);
            temp = this.products[i];
          }
          else{
            if(temp?.group_id != this.products[i].group_id){
              console.log("Hey");
              this.cartItems.push([]);
              // this.cartItems[i].push([]);
              counter++;
              this.cartItems[counter].push(this.products[i]);
            
            }
            else{
              if(this.products[i].group_id.length < 10){
                this.cartItems[counter][0].qty += this.products[i].qty;
              }
              else{
                this.cartItems[counter].push(this.products[i]);
              }
            }
            console.log(temp.group_id + ' ' + this.products[i].group_id);
            temp = this.products[i];
          }
        }
        console.log(this.cartItems);
      },200)
      




  }

  stepper(myInput:any,btn: any,item: any){

      let index: any;
  
      for(let i=0; i< this.products.length;i++){
        if(item.mtrl == this.products[i].mtrl){
          index = i;
        }
      }
  
      let id = btn.id;
      let min = myInput.getAttribute("min");
      let max = myInput.getAttribute("max");
      let step = myInput.getAttribute("step");
      let val = this.products[index].qty;
      let calcStep = (id == "increment") ? (step*1) : (step * -1);
      let newValue = +val + calcStep;
      this.products[index].qty = newValue;
      
      
      if(newValue >= min && newValue <= max){
        myInput.setAttribute("value", this.products[index].qty);
      }
  
      console.log(this.products[index]);
      
      this.cartService.addToCart(this.products[index],false)
      this.GrandTotal = 0;
      for(let prod of this.products){
        this.GrandTotal += +prod.wholesale *prod.qty;
      }     
      
      console.log(this.GrandTotal)

    
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

    // window.location.reload();


  }


  removeOne(item: any, index: number,reload: boolean){

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

        })

        if(reload){
          setTimeout(() => {
            window.location.reload();
          }, 500)
        }



  }



  clearAll(reload: boolean){
    let loadedUser = JSON.parse(localStorage.getItem("userData")|| '{}');
    
    
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/removeCartItem.php",
    {
      mtrl:10,
      trdr:loadedUser.trdr,
      id:1,
      group_id: 'test'

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

    if(reload){
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }


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

  handleContinueShopping(){
    let currentCategory = JSON.parse(localStorage.getItem('currentCategory') || '{}')
    console.log(currentCategory);

    this.router.navigate(['products',currentCategory.id,currentCategory.name]);
  }


  ngOnDestroy(): void {
  }

}
