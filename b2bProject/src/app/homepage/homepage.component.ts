import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../porducts/products.service';
import axios from "axios";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],

})
export class HomepageComponent implements OnInit {
  mainCategories : any = [];
  loadedUser:any
  showDescription1: boolean = false;
  showDescription2: boolean = false;
  showDescription3: boolean = false;
  showDescription4: boolean = false;
  seeEarlier:any;
  isEmpry:boolean=false;
  offer1:any = [];
  offer2:any=[];

  source: string = '../../assets/pexels-expect-best-323772.jpg';
  showLoggedInContent: boolean = false;
  username = localStorage.getItem('username');

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
    this.loadedUser = JSON.parse(localStorage.getItem('userData') || '{}');

    this.getSeeEarlier();


    if(this.username){
      this.showLoggedInContent = true;
    }
    else{
      this.showLoggedInContent = false;
    }



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
 async getSeeEarlier(){
   let req =await axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getAllSeeEarlier.php",{
      trdr: this.loadedUser.trdr
    })
    this.seeEarlier = req.data.products;
    if(this.seeEarlier.length == 0){
      this.isEmpry = true;
    }else{
      this.isEmpry = false;
    }

   console.log(this.seeEarlier);

  }
  hundleOffer(product:any){
    this.productsService.setSingleProduct(product);
    this.router.navigate(['../products/product-page']);
  }
  goToProducts(mainCategory: any){
    console.log(mainCategory);
    this.router.navigate(['products', mainCategory.id,mainCategory.name]);

  }



}
