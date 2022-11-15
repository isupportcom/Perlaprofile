import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";
import { AuthService } from '../services/auth.service';
import {CartServiceService} from "./cart-service.service";
import axios from "axios";
import { TranslateConfigService } from '../services/translate-config.service';


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
  currentLang = localStorage.getItem('lang') || 'el'


  @Input('quantityInput') quantityInput?: ElementRef;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateConfigService,
    private cartService : CartServiceService
    ) { }

  ngOnInit(): void {


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

        for(let i=0;i<this.products.length;i++){
          if(this.products[i].hasOffer){
            this.products[i].wholesale = this.products[i].offer
          }
        }

        for(let prod of this.products){
          this.GrandTotal += +prod.wholesale *prod.qty;
        }
        this.GrandTotal = +this.GrandTotal.toFixed(4);
        console.log(this.GrandTotal)
      }
      );




      setTimeout(()=>{
        this.declareArray();
      },200)



  }

  declareArray(){

      console.log(this.products);

      let counter = 0;
      let temp: any;
      if(this.products){
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
      }


  }

  stepper(myInput:any,btn: any,item: any,items?: any,prod?: any){
      let inputsArray = [];

      if(items){
        for(let product of prod.children){
          if(product.children[0].nodeName != 'BUTTON'){
            // console.log(product.children[1].children[0].children[0].children[0].children[0].children[1]);
            inputsArray.push(product.children[1].children[0].children[0].children[0].children[0].children[1]);
          }
        }
      }


      let temp;
      let index: any;

      for(let i=0; i< this.products.length;i++){
        if(item.mtrl == this.products[i].mtrl){
          index = i;
        }
      }



      if(items){



          for(let i=0;i<this.products.length;i++){

            if(this.products[i].group_id == item.group_id){
              let id = btn.id;
              let min = myInput.getAttribute("min");
              let max = myInput.getAttribute("max");
              let step = myInput.getAttribute("step");
              let val = this.products[i].qty;
              let calcStep = (id == "increment") ? (step*1) : (step * -1);
              let newValue = +val + calcStep;

              if(newValue == 0){
                this.removeOne(this.products[i],i,false);

              }
              else{
                let flag = false;
                if(this.products[i].qty > newValue){
                  flag = true;

                }
                this.products[i].qty = newValue;




                this.products[i].qty = newValue;




                for(let input of inputsArray){
                  if(newValue >= min && newValue <= max){
                    input.setAttribute("value", this.products[i].qty);
                  }
                }
                  // console.log(myInput.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children)

                  if(flag){
                    this.cartService.addToCart(this.products[i],false,undefined,true);
                  }
                  else{
                    this.cartService.addToCart(this.products[i]);
                  }


                }
              }

            }

      }
      else{

        let id = btn.id;
        let min = myInput.getAttribute("min");
        let max = myInput.getAttribute("max");
        let step = myInput.getAttribute("step");
        let val = this.products[index].qty;
        let calcStep = (id == "increment") ? (step*1) : (step * -1);
        let newValue = +val + calcStep;

        if(newValue == 0){
          this.removeOne(this.products[index],index,false);

        }
        else{
          let flag = false;
          if(this.products[index].qty > newValue){
            flag = true;

          }
          this.products[index].qty = newValue;


          console.log(this.products[index]);

          if(flag){
            this.cartService.addToCart(this.products[index],false,undefined,true);
          }
          else{
            this.cartService.addToCart(this.products[index]);
          }
        }

      }



      this.GrandTotal = 0;
      for(let prod of this.products){
        this.GrandTotal += +prod.wholesale *prod.qty;
      }

      this.GrandTotal = +this.GrandTotal.toFixed(4);

      console.log(this.GrandTotal)


}




  removeOne(item: any, index: number,reload: boolean){

      if(this.length > 1){
        this.GrandTotal -= this.products[index].wholesale;
      }
      else{
        this.GrandTotal = 0;
      }
      this.GrandTotal = +this.GrandTotal.toFixed(4);
        console.log(item);

        let loadedUser = JSON.parse(localStorage.getItem("userData")|| '{}');
        axios.post("https://perlarest.vinoitalia.gr/php-auth-api/removeCartItem.php",
        {
          mtrl:item.mtrl,
          trdr:loadedUser.trdr,
          id:2,
          group_id: item.group_id
        }
        ).then(resData=>{
          this.products = resData.data.products;
          this.temp = this.products
          this.cartItems = [];
          this.declareArray();

          this.length = this.products.length
          console.log(resData);
          console.log(this.products)

          this.cartService.sendProductCount(this.products.length);

          this.GrandTotal = 0;
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
          this.GrandTotal = +this.GrandTotal.toFixed(4);
          console.log(this.GrandTotal)

        })
        // setTimeout(()=>{
        //   this.declareArray();
        // },400)

        // if(reload){
        //   setTimeout(() => {
        //     window.location.reload();
        //   }, 500)
        // }



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
      this.cartItems = [];
      this.products = resData.data.products;
      this.length = this.products.length
      this.cartService.sendProductCount(this.length);
      this.GrandTotal = 0;
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
      this.GrandTotal = +this.GrandTotal.toFixed(4);
      console.log(this.GrandTotal)
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/fetchCartItems.php",{trdr:loadedUser.trdr})
    .then(
      (resData:any)=>{
        console.log(resData);
        this.products = resData.data.products
        this.cartService.sendProductCount(this.products.length);
      })


    })
    setTimeout(()=>{
      this.declareArray();
    },400)




  }

  handleCheckout(btn: any){
    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      axios.post("https://perlarest.vinoitalia.gr/php-auth-api/updateStock.php",{
        method:"STOCKUPDATE"
      }).then(resData=>{
        console.log(resData.data);
        btn.classList.remove('loading')
        this.router.navigate(['checkout']);
      })
    }



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
