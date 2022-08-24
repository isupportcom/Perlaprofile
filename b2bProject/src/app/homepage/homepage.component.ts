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
}
