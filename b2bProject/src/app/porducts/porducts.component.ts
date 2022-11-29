import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { CartServiceService } from '../cart/cart-service.service';
import { Category } from './categories.model';
import { tap } from "rxjs/operators";
import { product } from '../AdminArea/adminareaproducts/adminareaproducts.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-porducts',
  templateUrl: './porducts.component.html',
  styleUrls: ['./porducts.component.css']
})



export class PorductsComponent implements OnInit {
  backOrder: boolean = false;
  relatedProducts:product |any =[1,2,3,4];
  logoSource!: string;
  mainCategory= {
    id: 0,
    name: ''
  };
  constructor(private cartService: CartServiceService,private route: ActivatedRoute,private router: Router) { }

  innerWidth!: number;
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <1400){
      this.relatedProducts = [1,2,3];
    }
    if(this.innerWidth < 992){
      this.relatedProducts = [1,2];
    }
    if(this.innerWidth < 576){
      this.relatedProducts = [1];
    }

  }

  ngOnInit(): void {
    


    this.mainCategory = JSON.parse(localStorage.getItem("currentCategory") || '{}');  
    

    if(this.mainCategory.id === 114){
      this.logoSource = '../../../assets/control-logo-white-with-green.svg';
    }
    else if(this.mainCategory.id === 115){
      this.logoSource = '../../../assets/motion-logo-white-with-green.svg';
    }
    else if(this.mainCategory.id === 116){
      this.logoSource = '../../../assets/mosqui-logo-white-with-green.svg';
    }    
    else if(this.mainCategory.id === 117){
      this.logoSource = '../../../assets/profile-logo-white-with-green.svg';
    }

    this.router.navigate(['products' , 114,'Control'])
    
  }


}


