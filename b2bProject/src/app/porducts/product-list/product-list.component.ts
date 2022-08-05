import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public totalProducts = [11,12,13,1,21,2,21];

  constructor() { }

  ngOnInit(): void {
  }

}
