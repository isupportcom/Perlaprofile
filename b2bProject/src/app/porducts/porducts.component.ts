import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-porducts',
  templateUrl: './porducts.component.html',
  styleUrls: ['./porducts.component.css']
})
export class PorductsComponent implements OnInit {
  public totalProducts = [11,12,13,1,21,2,21];
  constructor() { }

  ngOnInit(): void {
  }

}
