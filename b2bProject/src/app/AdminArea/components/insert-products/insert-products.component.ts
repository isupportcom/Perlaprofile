import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../porducts/products.service";
import {product} from "../../adminareaproducts/adminareaproducts.component";

@Component({
  selector: 'app-insert-products',
  templateUrl: './insert-products.component.html',
  styleUrls: ['./insert-products.component.css']
})
export class InsertProductsComponent implements OnInit {
  products : product[] | any ;
  page:number = 1;
  constructor(
    private productsService:ProductsService
  ) { }

  ngOnInit(): void {

    this.products = this.productsService.getAll();

  }

}
