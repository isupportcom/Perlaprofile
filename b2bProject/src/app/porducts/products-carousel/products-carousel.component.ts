import { Component, Input, OnInit } from '@angular/core';
import axios from 'axios';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { product } from 'src/app/AdminArea/adminareaproducts/adminareaproducts.component';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.css'],
})
export class ProductsCarouselComponent implements OnInit {
  @Input() mode: any;
  @Input() mtrl: any;
  suggestedProducts:product|any;
  hasSuggested:boolean =false;
  suggested:any;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
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
        items: 4
      }
    },
    nav: true
  }

  numbers = [1,2,3,4,5,6,7,8];

  constructor() { }

  async ngOnInit() {
    
    console.log(this.mode);
    
    
    if(this.mode == 'suggested'){
      
    }
    
    
    if(this.mode == 'offers'){
      let request = await axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getAllproductsRelated.php",{mtrl: +this.mtrl})
      console.log(request.data)
      this.suggestedProducts = request.data.products;
      if(this.suggestedProducts.length !=0){
        this.hasSuggested = true;
      }
  
      let sugg = await axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getAllSuggested.php",
      {
        mtrl:this.mtrl
      })
      console.log(sugg.data.products);
      this.suggested = sugg.data.products;
      if(this.suggested.length ==0){
          this.hasSuggested=false;
      }else{
        this.hasSuggested = true;
      }
    }
    
  }


}
