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
  @Input() mode: any;
  @Input() mtrl: any;
  @Input() category?: any;
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
    
    console.log(this.category);
    
    
    if(this.mode == 'suggested'){
      
      let request = await axios.post("https://perlarest.vinoitalia.gr/products/related/getAllRelated.php",{mtrl: +this.mtrl})
      console.log(request.data)
      this.suggestedProducts = request.data.products;
      if(this.suggestedProducts.length !=0){
        this.hasSuggested = true;
      }
  
      let sugg = await axios.post("https://perlarest.vinoitalia.gr/products/getSuggested.php",
      {
        mtrl:this.mtrl
      }).then(resData =>{
          console.log(resData);
          
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
      axios.post('https://perlarest.vinoitalia.gr/products/offers/offersByCategory.php', {
        category_id: this.category.id
      }).then(resData => {
        this.shownProducts = resData.data.offers;
        
      })
    }
  }

  seeProduct(product: any){
    console.log(product);
    this.productsService.setSingleProduct(product)

    axios.post("https://perlarest.vinoitalia.gr/products/getSeeEarlier.php",{
     
      trdr: this.loadedUser.trdr
    }).then(resData=>{
      console.log(resData.data);
    })
    
    setTimeout(() => {
      this.router.navigate(['/products/product-page']);
    },100)
    
  }


}
