import { Component, OnInit } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-allimages',
  templateUrl: './allimages.component.html',
  styleUrls: ['./allimages.component.css']
})
export class AllimagesComponent implements OnInit {
  images:string |any= [];
  constructor() { }

  ngOnInit(): void {

    axios.get("https://perlarest.vinoitalia.gr/php-auth-api/getImages.php/?id=9&method=allImages")
      .then(photoName=>{
        console.log(photoName)
        for(let i =0;i<photoName.data.length;i++){
          this.images[i] =photoName.data[i].image;

        }
        console.log(this.images)

      })
  }

}
