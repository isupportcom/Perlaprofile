import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { of, Subject } from 'rxjs';
import { CartServiceService } from 'src/app/cart/cart-service.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-mosqui-wizzard',
  templateUrl: './mosqui-wizzard.component.html',
  styleUrls: ['./mosqui-wizzard.component.css'],
})
export class MosquiWizzardComponent implements OnInit {
  subCategoryName: string = '';
  subCategoryId: number | any;
  fabric: any = [];
  polydrox: any = [];
  profile: any = [];
  ral: any = [];
  wooden: any = [];
  product:any=[];
  flag: boolean = false;
  color: any;

  @Input() name: any;
  @Input() sub_id: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService : CartServiceService,
    private productsService: ProductsService
  ) {}
  dimentions: FormGroup | any;
  clear(){
    this.dimentions.reset();
  }
  checkValid(){
    if (this.hasExtra) {
      this.color = this.dimentions.value.extra;


    } else {
      this.color = 'None';
    }

  }

  ngOnInit() {
    axios
      .post('https://perlarest.vinoitalia.gr/php-auth-api/getAllColors.php', {
        method: 'notNeed',
      })
      .then((resData) => {
        console.log(resData.data);

        this.fabric = resData.data.colors.fabric;
        this.polydrox = resData.data.colors.polydrox;
        this.profile = resData.data.colors.profile;
        this.ral = resData.data.colors.ral;
        this.wooden = resData.data.colors.wooden;
      });


    this.dimentions = this.fb.group({
      width: [null],
      height: [null],
      fabric: [null],
      profile: [null],
      extra: [null],
    });

    this.route.params.subscribe((res: any) => {
      console.log(res);
      this.subCategoryName = res.sub_name;
      this.subCategoryId = res.sub_id;
    });
  }



  findProduct(btn: any){

    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => {
        btn.classList.remove('loading')
        if(this.dimentions.valid){
          axios
          .post(
            'https://perlarest.vinoitalia.gr/php-auth-api/findMosquiProduct.php',
            {
              subcategory: this.sub_id,
              fabric: this.dimentions.value.fabric,
              profile: this.dimentions.value.profile,
              width: this.dimentions.value.width,
              height: this.dimentions.value.height,
              color: this.dimentions.value.extra? this.dimentions.value.extra : 'none' 
            }
          )
          .then((resData) => {
            console.log(resData.data);
            this.product = resData.data.products
            console.log(this.product);
            this.flag = true;
            this.productService.sendMosquiProductFound(resData.data.products);
          });
      }}, 2700);
      }
    console.log(this.dimentions.value);



    
      
      // setTimeout(() => {
        
      // },100)
    }
  

  hasHeigh: boolean | any;
  hasWidth: boolean | any;
  shouldContinue: boolean = false;
  hasFabric: boolean | any;
  hasProfile: boolean | any;
  hasExtra: boolean | any;
  addToCart(){
      console.log(this.product);
      this.productsService.setSingleProduct(this.product[0]);
      this.cartService.setId(this.product[0].mtrl)
      this.cartService.addToCart(this.product[0]);
  }
  extraInput: boolean = false;
  extraInputArray: any;
  needsExtra() {
    console.log(this.dimentions.value.profile);
    if (
      this.dimentions.value.profile == 107 ||
      this.dimentions.value.profile == 106 ||
      this.dimentions.value.profile == 108
    ) {
      this.extraInput = true;
      if (this.dimentions.value.profile == 107) {
        this.extraInputArray = this.polydrox;
      } else if (this.dimentions.value.profile == 106) {
        this.extraInputArray = this.ral;
      } else if (this.dimentions.value.profile == 108) {
        this.extraInputArray = this.wooden;
      }
    } else {
      this.extraInput = false;
    }
  }
}
