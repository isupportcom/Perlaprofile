import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CartServiceService } from '../cart/cart-service.service';

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.css']
})
export class OrderCompletedComponent implements OnInit {

  constructor(private cartService: CartServiceService) { }

  ngOnInit(): void {
    let loadedUser = JSON.parse(localStorage.getItem("userData")|| '{}');
    
    
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/removeCartItem.php",
    {
      mtrl:10,
      trdr:loadedUser.trdr,
      id:1,
      group_id: 'test'

    }).then(resData => {
      console.log(resData);
      
    })
  }

}
