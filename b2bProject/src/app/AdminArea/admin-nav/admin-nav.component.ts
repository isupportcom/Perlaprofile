import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

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

  makeSmallerDropDown?: boolean;
  isOpen = false;
  component:number | any;
  constructor(
      private authService: AuthService,
      private router:Router,
      private rendere :Renderer2
  ) {
    this.rendere.listen('window','click',(e:Event)=>{
      if(e.target !== this.options.nativeElement && e.target !== this.optionsToggler.nativeElement){
        this.showList = false;
      }
      if(e.target !== this.img.nativeElement && e.target !== this.imgTogler.nativeElement){
        this.showImg = false;
      }
    })
  }
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
    setTimeout(() => {
      el.children[1].style.opacity = '1';
    },200)
    el.children[1].style.display = 'flex';

  }

  handleLeave(el: any){
      el.children[1].style.display = 'none';
      setTimeout(() => {
        el.children[1].style.opacity = '0';
      },200)
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
      this.router.navigate([destination])

  }
  showContent(component:number){
    this.component = component;
    localStorage.setItem("page",JSON.stringify(this.component))
  }




}
