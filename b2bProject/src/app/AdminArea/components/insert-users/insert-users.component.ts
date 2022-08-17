import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
export interface user {
  [index: number]: {
    afm: string,
    code: string,
    doy: string,
    name: string,
    phone1: string,
    phone2: string,
    trdr: string
  }
}
@Component({
  selector: 'app-insert-users',
  templateUrl: './insert-users.component.html',
  styleUrls: ['./insert-users.component.css']
})

export class InsertUsersComponent implements OnInit {
  user :user |any =[];
  page:number = 1;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    axios.get("https://perlaprodileapi.isupport.com.gr/main2.php?id=3/")
      .then(resData=>{

        for (let i = 0; i < resData.data.length; i++){

          this.user[i]={
            afm: resData.data[i].afm,
            code: resData.data[i].code,
            doy: resData.data[i].doy,
            name: resData.data[i].name,
            phone1: resData.data[i].phone1,
            phone2: resData.data[i].phone2,
            trdr : resData.data[i].trdr
          }
        }
      })
  }
// convenience getter for easy access to form fields



}
