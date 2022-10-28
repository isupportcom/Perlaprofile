import { Component, HostListener, OnInit } from '@angular/core';
import {User} from "../services/user.model";
import axios from "axios";



@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})

export class MyOrdersComponent implements OnInit {
  loadedUser: User = JSON.parse(localStorage.getItem('userData') || '{}');
  orders:any = [];
  noOrderText = "";
  test:boolean = false;
  orderDetail:any ;
  showVertical: boolean = false;
  constructor() { }

  innerWidth:any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.innerWidth = window.innerWidth

    if(this.innerWidth <= 768){
      this.showVertical = true;
    }else{
      this.showVertical = false;
    }
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth

    if(this.innerWidth <= 768){
      this.showVertical = true;
    }else{
      this.showVertical = false;
    }

    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/orders.php",{
      method:"ORDERS",
      trdr: this.loadedUser.trdr
    }).then(resData=>{
      console.log(resData.data)
      if(resData.data.totalcount == 0){
        this.noOrderText = "You Have No Orders";
      }else{
          this.orders = resData.data.rows;
        console.log(this.orders)
      }
    })
  }

  close(){
    this.orderDetail = false;
  }
  showOrder(findoc:any){
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/analisiOrder.php",{
      method:"ORDERLINES",
      findoc: findoc
    }).then(resData=>{
      console.log(resData.data)
      this.orderDetail = resData.data.rows;
      console.log(this.orderDetail);
    })
  }

}
