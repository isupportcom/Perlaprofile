import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { product } from 'src/app/AdminArea/adminareaproducts/adminareaproducts.component';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.css'],
})
export class ProductsCarouselComponent implements OnInit {
  notEmpty: boolean = false;
  @Input() mode: any;
  @Input() mtrl: any;
  @Input() category?: any;
  currentLang:string|any;
  suggestedProducts:product|any;
  hasSuggested:boolean =false;
  suggested:any;
  shownProducts:product|any;
  loadedUser = JSON.parse(localStorage.getItem("userData") || '{}')
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      },
    },
    nav: true
  }

  numbers = [1,2,3,4,5,6,7,8];

  constructor(private productsService: ProductsService,
    private router: Router,) { }

  async ngOnInit() {
    this.currentLang = localStorage.getItem('lang');
    console.log(this.category);


    if(this.mode == 'suggested'){

      let request = await axios.get("https://perlanoderest.vinoitalia.gr/products/getProducts",{params:{mtrl: +this.mtrl}})
      console.log(request.data)
      this.suggestedProducts = request.data.products;
      if(this.suggestedProducts.length !=0){
        this.hasSuggested = true;
      }

      let sugg = await axios.post("https://perlaNodeRest.vinoitalia.gr/products/getAllSuggested",
      {
        mtrl:this.mtrl
      }).then(resData =>{
        if(resData.data.products.length > 0){
          this.notEmpty = true;
          this.shownProducts = resData.data.products;
          console.log(resData.data.products);
        }
        else{
          this.notEmpty = false;
        }

        }
      )
      // console.log(sugg.data.products);
      // this.suggested = sugg.data.products;
      // if(this.suggested.length ==0){
      //     this.hasSuggested=false;
      // }else{
      //   this.shownProducts = this.suggested
      //   this.hasSuggested = true;
      // }
    }


    if(this.mode == 'offers'){
      axios.post('https://perlaNodeRest.vinoitalia.gr/products/offersByCategory', {
        category_id: this.category.id
      }).then(resData => {
        if(resData.data.products.length > 0){
          this.notEmpty = true;
          this.shownProducts = resData.data.products;
          console.log(resData.data.products);
        }
        else{
          this.notEmpty = false;
        }


      })
    }
  }

  seeProduct(product: any){
    console.log(product);
    this.productsService.setSingleProduct(product)

    // axios.get("https://perlanoderest.vinoitalia.gr/products/seeEarlier",{
    //   params:{mtrl :product.mtrl,
    //     trdr: this.loadedUser.trdr}
    // }).then(resData=>{
    //   console.log(resData.data);
    // })

   this.productsService.sendSuggProd(JSON.stringify(product))
   

  }


}
