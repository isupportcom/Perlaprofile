import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../porducts/products.service';

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

  constructor(private productsService: ProductsService,private router: Router) { }

  ngOnInit(): void {
    this.productsService.getMainCategories().subscribe(resData => {
      this.mainCategories = resData;
      console.log(this.mainCategories);
      
    });

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
