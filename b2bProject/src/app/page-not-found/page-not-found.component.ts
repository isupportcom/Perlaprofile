import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  options: AnimationOptions = {
    path: '../../assets/lf30_editor_nxd4hihw.json',
  };




  constructor() { }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
