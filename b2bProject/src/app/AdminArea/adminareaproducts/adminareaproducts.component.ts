import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
// import axios from "axios"
@Component({
  selector: 'app-adminareaproducts',
  templateUrl: './adminareaproducts.component.html',
  styleUrls: ['./adminareaproducts.component.css']
})
export class AdminareaproductsComponent implements OnInit {
  public totalProducts:any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    
  }
  updateDatabase(){
    
  }

}
