import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @ViewChild('productCard') productCard: ElementRef | undefined;
  @ViewChild('productImg') productImg: ElementRef | undefined;
  @ViewChild('addToCartBtn') addToCartBtn: ElementRef | undefined;
  

  constructor(private renderer: Renderer2, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  handleHover(){
    this.renderer.setStyle(this.productCard?.nativeElement, 'box-shadow', 'rgba(100, 100, 111, 0.4) 0px 7px 29px 0px');
    this.renderer.setStyle(this.productCard?.nativeElement, 'transition', '0.2s box-shadow ease-in');
  
    this.renderer.setStyle(this.productImg?.nativeElement, 'transform', 'scale(1.1)');
    this.renderer.setStyle(this.productImg?.nativeElement, 'transition' , '0.3s transform ease-in');

    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'box-shadow', 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px');
    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'transform' , 'scale(1.02)'); 
    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'transition' , '0.2s box-shadow ease-in, 0.2s transform ease-in' );
  }

  handleMouseLeave(){
    this.renderer.setStyle(this.productCard?.nativeElement, 'box-shadow', 'none');

    this.renderer.setStyle(this.productImg?.nativeElement, 'transform', 'scale(1)');

    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'box-shadow', 'none');
    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'transform', 'scale(1)');
  }


  handleBtnHover(){
    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'background-color', '#1f2b36');
    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'transition' , '0.5s background-color ease-in' );
  }

  handleBtnMouseLeave(){
    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'background-color', '#2c3e50');
  }
  
  handleClick(){
    this.router.navigate(['product-page'], {relativeTo: this.route});
  }
}
