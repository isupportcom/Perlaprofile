import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

import {faImages} from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('options')options!:ElementRef;
  @ViewChild('optionsToggler') optionsToggler!: ElementRef;
  @ViewChild('img')img!:ElementRef;
  @ViewChild('imgTogler')imgTogler!:ElementRef;
  showList:boolean=false;
  showImg:boolean = false;
  flag: boolean = false;
  makeSmallerDropDown?: boolean;
  isOpen = false;
  arr: any = [];
  arrow: any;
  component:number | any;
  faImages = faImages;
  faSquarePlus = faSquarePlus;
  constructor(
      private authService: AuthService,
      private router:Router,
      private renderer :Renderer2,
      private element: ElementRef
  ) {}
  innerWidth:any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.innerWidth = window.innerWidth

    if(this.innerWidth < 768 ){

      this.makeSmallerDropDown = true;
    }
    else{

      this.makeSmallerDropDown = false;
    }

  }
  ngOnInit(): void {
    localStorage.setItem("firsTime","1");
    if(localStorage.getItem("firstTime")=="1"){
      this.router.navigate(['home']);
    }
    if(localStorage.getItem("page") != "") {
      this.component = localStorage.getItem("page");
    }
  }

  setDropdown(element: HTMLElement) {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      element.classList.add('show');
    } else {
      element.classList.remove('show');
    }
  }


  handleOver(el: any){
    if(!this.flag){
      this.renderer.setStyle(el, 'width' , '320px')
      setTimeout(() => {
        this.renderer.setStyle(el.children[1].children[0], 'color' , 'black')
        this.renderer.setStyle(el.children[1].children[0], 'opacity' , '1')
      },50)
    }

  }

  handleLeave(el: any){
    


    if(!this.flag){

      this.renderer.setStyle(el, 'width' , '60px')
      setTimeout(() => {
        this.renderer.setStyle(el.children[1].children[0], 'color' , 'white')
        this.renderer.setStyle(el.children[1].children[0], 'opacity' , '0')
      },50)
    }
  }

  handleShowAllOver(arr: any){
    // console.log(arr);
    for(let el of arr){
      this.renderer.setStyle(el, 'width' , '320px')
      setTimeout(() => {
        this.renderer.setStyle(el.children[1].children[0], 'color' , 'black')
        this.renderer.setStyle(el.children[1].children[0], 'opacity' , '1')
      },50)
    }
    
  }

  handleShowAllLeave(arr: any){
    for(let el of arr){
      this.renderer.setStyle(el, 'width' , '60px')
      setTimeout(() => {
        this.renderer.setStyle(el.children[1].children[0], 'color' , 'white')
        this.renderer.setStyle(el.children[1].children[0], 'opacity' , '0')
      },50)
    }
  }

  clickShowAll(arr: any, arrow: any){
    this.arr = arr;
    this.arrow = arrow;
    if(this.flag){
      this.renderer.setStyle(arrow,'transform','rotateY(0deg)')

      for(let el of arr){
        this.renderer.setStyle(el, 'width' , '60px')
        setTimeout(() => {
          this.renderer.setStyle(el.children[1].children[0], 'color' , 'white')
          this.renderer.setStyle(el.children[1].children[0], 'opacity' , '0')
        },50)
      }
      this.flag = false;
    }
    else{
      this.renderer.setStyle(arrow,'transform','rotateY(180deg)')

      for(let el of arr){
        this.renderer.setStyle(el, 'width' , '320px')
        setTimeout(() => {
          this.renderer.setStyle(el.children[1].children[0], 'color' , 'black')
          this.renderer.setStyle(el.children[1].children[0], 'opacity' , '1')
        },50)
      }
      this.flag = true;
    }

  }

  logout(){

  }
  content(){
    console.log(this.showList);


    if(!this.showList){
      this.showList=true;
    }else{
      this.showList=false;
    }
    console.log(this.showList);
  }
  showImages(){
    if(!this.showImg){
      this.showImg=true;
    }else{
      this.showImg=false;
    }
  }
  handleHomepage(){
    this.router.navigate(['home']);
    setTimeout(() => {
      window.location.reload();
    },50)

  }

  navigateTo(destination:string){
      if(this.flag){

        this.clickShowAll(this.arr,this.arrow)
      }  
      this.router.navigate([destination])

  }
  showContent(component:number){
    this.component = component;
    localStorage.setItem("page",JSON.stringify(this.component))
  }




}
