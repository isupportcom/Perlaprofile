import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ProductsService } from 'src/app/porducts/products.service';
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
  constructor(private cartService:CartServiceService,private productsService:ProductsService) { }

  ngOnInit(): void {
      this.getProducts();

  }
  getProducts(){
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/favorites.php",{
        trdr: this.loadedUser.trdr,
        mtrl:"dontNeedIt",
        mode:"fetch"
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

    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/favorites.php",
    {
      mtrl:product,
      trdr:this.loadedUser.trdr,
      mode:"deleteOne"
    })
    .then(resData=>{
      console.log(resData.data);
      this.getProducts()
    })

  }
  removeAll(){
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/favorites.php",
    {
      mtrl:"notNeed",
      trdr:this.loadedUser.trdr,
      mode:"delete"
    })
    .then(resData=>{
      console.log(resData.data);
      this.getProducts()

    })
  }
  addToCart(product:any){
      console.log(product);
      this.productsService.setSingleProduct(product);

      this.cartService.setId(product.mtrl)
      this.cartService.addToCart(product)
  }

}
