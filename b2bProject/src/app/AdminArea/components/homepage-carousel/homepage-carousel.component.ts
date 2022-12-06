import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-homepage-carousel',
  templateUrl: './homepage-carousel.component.html',
  styleUrls: ['./homepage-carousel.component.css']
})
export class HomepageCarouselComponent implements OnInit {
  carousel:FormGroup | any
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.carousel = this.fb.group({
      id:[null],
      text :[null],
      image:[null],
      route:[null]
    })

  }
  upload(){
    axios.post('https://perlaNodeRest.vinoitalia.gr/carousel/setCarousel',{
      slider: this.carousel.value.id,
      image:this.carousel.value.image,
      text :this.carousel.value.text,
      route:this.carousel.value.route
    })
    .then(resData=>{
      console.log(resData.data)
    })
  }
}
