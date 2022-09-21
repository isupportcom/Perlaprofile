import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../porducts/products.service';
import axios from "axios";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  mainCategories : any = [];
  showDescription1: boolean = false;
  showDescription2: boolean = false;
  showDescription3: boolean = false;
  showDescription4: boolean = false;
  offer1:any = [];
  offer2:any=[];

  source: string = '../../assets/pexels-expect-best-323772.jpg';


  constructor(private productsService: ProductsService,private router: Router) { }

  innerWidth:any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.innerWidth = window.innerWidth
    console.log(this.innerWidth);


    if(this.innerWidth <= 770){
      this.source = '../../assets/hero 770px width.png';
    }
    else if(this.innerWidth <= 985){
      this.source = '../../assets/hero 985px width.png';
    }
    else if(this.innerWidth <= 1200){
      this.source = '../../assets/hero 1200px width.png';
    }
    else if(this.innerWidth <= 9999){
      this.source = '../../assets/pexels-expect-best-323772.jpg';

    }
    else{
      this.source = '../../assets/hero 770px width.png';
    }

  }

   ngOnInit() {
    this.productsService.getMainCategories().subscribe(resData => {
      this.mainCategories = resData;
      console.log(this.mainCategories);

    });

    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getAllOffers.php",{
      product:"product",
      offer:"2"
    }).then(resData=>{

      console.log(resData.data)
      this.offer1 = resData.data.offers[0]
      this.offer2 = resData.data.offers[1];
      console.log(this.offer1)
      console.log(this.offer2)
    })



  }
  handleProductPage(product:any){
    this.productsService.setSingleProduct(product);
    this.router.navigate(['../products/product-page']);
  }
  goToProducts(mainCategory: any){
    console.log(mainCategory);
    this.router.navigate(['products', mainCategory.id,mainCategory.name]);

  }

  showDesc(mainCategory: any){
    if(mainCategory.id == 114){
      this.showDescription1 = true;
    }
    if(mainCategory.id == 115){
      this.showDescription2 = true;
    }
    if(mainCategory.id == 116){
      this.showDescription3 = true;
    }
    if(mainCategory.id == 117){
      this.showDescription4 = true;
    }
  }

  hideDesc(mainCategory: any){
    if(mainCategory.id == 114){
      this.showDescription1 = false;
    }
    if(mainCategory.id == 115){
      this.showDescription2 = false;
    }
    if(mainCategory.id == 116){
      this.showDescription3 = false;
    }
    if(mainCategory.id == 117){
      this.showDescription4 = false;
    }

  }

}
