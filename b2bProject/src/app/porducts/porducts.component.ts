import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart/cart-service.service';
import { Category } from './categories.model';
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-porducts',
  templateUrl: './porducts.component.html',
  styleUrls: ['./porducts.component.css']
})
export class PorductsComponent implements OnInit {
  constructor(private cartService: CartServiceService) { }

  

  ngOnInit(): void {

  }


}
