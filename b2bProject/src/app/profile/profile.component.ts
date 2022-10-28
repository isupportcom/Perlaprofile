import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {User} from "../services/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loadedUser: User = JSON.parse(localStorage.getItem('userData') || '{}');
  debt:string ="";
  constructor() { }

  ngOnInit(): void {
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/upoloipoPelati.php",{
      method:"Customer",
      trdr:this.loadedUser.trdr

    }).then(resData=>{
      console.log(resData.data)
      if(resData.data.data.debt == null){
        this.debt ="Your Debt Is:0";
      }else{
        this.debt = "Your Debt Is:"+resData.data.data.debt;
      }
    })

  }

}
