import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/porducts/products.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  loadedUser = JSON.parse(localStorage.getItem("userData") || '{}')
  hasProducts:boolean=false;
  products:any;
  relatedProducts:any
  currentLang = localStorage.getItem('lang') || 'el'
  constructor(private cartService:CartServiceService,private productsService:ProductsService,private translate: TranslateConfigService) { }

  ngOnInit(): void {
      this.getProducts();

  }
  getProducts(){
    axios.get("https://perlanoderest.vinoitalia.gr/products/favorites",{

        params:{
          trdr: this.loadedUser.trdr,
          mtrl:"dontNeedIt",
          mode:"fetch"
        }


      })
      .then(resData=>{
        console.log(resData.data);

        this.products = resData.data.products
        if(resData.data.products.length !=0){
          this.hasProducts = true;
        }else{
          this.hasProducts = false;
        }
      })
  }
  removeOne(product:any){
    console.log(product);


    axios.get("https://perlanoderest.vinoitalia.gr/products/favorites",
    {
     params:{
      mtrl:product,
      trdr:this.loadedUser.trdr,
      mode:"deleteOne"
     }
    })
    .then(resData=>{
      console.log(resData.data);
      this.products = resData.data.products;
    })

    setTimeout(() => {
      this.cartService.sendProductAddedToFav(false);
    },50)

  }
  removeAll(){
    axios.get("https://perlanoderest.vinoitalia.gr/products/favorites",
    {
     params:{
      mtrl:"notNeed",
      trdr:this.loadedUser.trdr,
      mode:"delete"
     }
    })
    .then(resData=>{
      console.log(resData.data);
      this.getProducts()
      window.location.reload();
    })


  }
  addToCart(product:any,btn: any){
    if(product.diathesima > 0){
      if(!btn.classList.contains('loading')) {
        btn.classList.add('loading');
        setTimeout(() => btn.classList.remove('loading'), 3700);
        }
        let relatedProductsObs: Observable<any>;

        relatedProductsObs = this.productsService.getRelatedProducts(
          product.mtrl
        );

        relatedProductsObs.subscribe((resData) => {
          console.log(resData);

          this.relatedProducts = resData.related;
        });
        setTimeout(async() => {


          if (this.relatedProducts.length <= 0) {
            this.cartService.setId(product.mtrl);

            this.productsService.setSingleProduct(product);
            product.show = true;
            await this.cartService.addToCart(product, false, true);

            this.cartService.sendProductAdded(true);
          } else {
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
            this.productsService.setSingleProduct(product);
            this.cartService.sendStartScope(true);
          }
        }, 500);
    }
    else{
      this.productsService.sendBackOrderPopup(true);

      this.productsService.backOrder.subscribe(resData => {
        if(resData){
          if(!btn.classList.contains('loading')) {
            btn.classList.add('loading');
            setTimeout(() => btn.classList.remove('loading'), 3700);
            }
            let relatedProductsObs: Observable<any>;

            relatedProductsObs = this.productsService.getRelatedProducts(
              product.mtrl
            );

            relatedProductsObs.subscribe((resData) => {
              console.log(resData);

              this.relatedProducts = resData.related;
            });
            setTimeout(async() => {


              if (this.relatedProducts.length <= 0) {
                this.cartService.setId(product.mtrl);

                this.productsService.setSingleProduct(product);
                product.show = true;
                await this.cartService.addToCart(product, false, true);

                this.cartService.sendProductAdded(true);
              } else {
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                });
                this.productsService.setSingleProduct(product);
                this.cartService.sendStartScope(true);
              }
            }, 500);
        }
      })
    }

  }

}
