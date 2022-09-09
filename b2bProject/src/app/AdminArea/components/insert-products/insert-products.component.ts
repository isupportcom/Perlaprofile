import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../porducts/products.service";
import {product} from "../../adminareaproducts/adminareaproducts.component";
import axios from "axios";
import {ModalService} from "../add-image-popup/modal-service.service";
import {CartServiceService} from "../../../cart/cart-service.service";


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
  searched:boolean=true;
  constructor(
    private productsService: ProductsService,
    private modalService:ModalService,
    private cartServiceService : CartServiceService
  ) {
  }

  ngOnInit() {
    this.cartServiceService.searchResult.subscribe((res:any)=>{
      console.log(res)
      this.products = res
      this.searched = false;
    })
    if(this.searched){
      this.getProducts();
      this.page = localStorage.getItem("pagination");
    }


    this.modalService.isClicked.subscribe((res:any)=>{
      this.window = false;
    })



  }
  changePage(e:any){
    this.page = e;
    localStorage.setItem("pagination",this.page);
  }
  removePhoto(item:any){
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/removePhoto.php",{
      mtrl:item
    }).then(resData=>{
      console.log(resData.data)
      setTimeout(()=>{
        window.location.reload()
      },500)
    })
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
    this.modalService.image.subscribe((res:any)=> {
      this.image = res
      console.log(this.image)
        axios.get("https://perlarest.vinoitalia.gr/php-auth-api/updateSingleImage.php/?id=11&mtrl="+item+"&image="+this.image)
          .then(res=> {
            console.log(res.data)


          } )
       window.location.reload()
    })
      }









  }


