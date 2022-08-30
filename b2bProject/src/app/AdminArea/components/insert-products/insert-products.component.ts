import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../porducts/products.service";
import {product} from "../../adminareaproducts/adminareaproducts.component";
import axios from "axios";
import {ModalService} from "../add-image-popup/modal-service.service";


@Component({
  selector: 'app-insert-products',
  templateUrl: './insert-products.component.html',
  styleUrls: ['./insert-products.component.css']
})
export class InsertProductsComponent implements OnInit {
  products: product | any = [];
  page: number |any;
  window:boolean = true;
  flag: boolean = false;
  image:string =""
  answer:string = ""
  constructor(
    private productsService: ProductsService,
    private modalService:ModalService
  ) {
  }

  ngOnInit() {
    this.page = localStorage.getItem("pagination");
    this.getProducts();
    this.modalService.isClicked.subscribe((res:any)=>{
      this.window = false;
    })



  }
  changePage(e:any){
    this.page = e;
    localStorage.setItem("pagination",this.page);
  }

  getProducts(){
    axios.get("https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php?id=2&method=allProducts").then(resData => {
      // console.log(resData.data)
      console.log(resData.data)
      for (let i = 0; i < resData.data.length; i++) {

        this.products[i] = {
          mtrl: resData.data[i].mtrl,
          name: resData.data[i].name,
          name1: resData.data[i].name1,
          code: resData.data[i].code,
          retail: resData.data[i].retailPrice,
          wholesale: resData.data[i].wholesalePrice,
          qty: 1,
          stock: resData.data[i].stock,
          img : resData.data[i].image
        }
      }
    })
  }
  open(item:any) {
    this.flag = true;
    this.window =true;
    console.log(item)
    this.modalService.image.subscribe((res:any)=>{
      this.image=res
      console.log(this.image)
      for(let product of this.products){
        if(product.mtrl == item){
          product.img = this.image
          axios.get("https://perlarest.vinoitalia.gr/php-auth-api/updateSingleImage.php/?id=11&mtrl="+item+"&image="+this.image)
            .then(res=>{
              setTimeout(()=>{
                this.ngOnInit();
              },2000)
            })

        }
      }
      // for(let i=0;i<this.products.length;i++){
      //   if(item == this.products[i].mtrl){
      //     this.products[i].img = this.image;
      //     console.log(i)
      //     axios.get("https://perlarest.vinoitalia.gr/php-auth-api/updateSingleImage.php/?id=11&mtrl="+this.products[i].mtrl+"&image="+this.products[i].img)
      //       .then(res=>{
      //         console.log(res.data)
      //         this.answer = res.data;
      //       })
      //
      //     break;
      //   }
      // }




    })


  }

}
