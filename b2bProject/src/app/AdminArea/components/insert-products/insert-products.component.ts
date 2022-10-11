import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../porducts/products.service";
import {product} from "../../adminareaproducts/adminareaproducts.component";
import axios from "axios";
import {ModalService} from "../add-image-popup/modal-service.service";
import {CartServiceService} from "../../../cart/cart-service.service";
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-insert-products',
  templateUrl: './insert-products.component.html',
  styleUrls: ['./insert-products.component.css']
})
export class InsertProductsComponent implements OnInit {
  offer:boolean = false;
  products:  any = [];
  page: number |any;
  window:boolean = true;
  flag: boolean = false;
  image:string =""
  answer:string = ""
  searched:boolean=true;
  checked:boolean|any;
  offerprice:number|any;
  discount:number|any;
  desciption:FormGroup|any
  dataSheet:FormGroup|any
  checkBoxes: any = document.getElementsByClassName("yoyo");
  constructor(
    private fb : FormBuilder,
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
    }else{
      this.getProducts()
    }

    this.dataSheet = this.fb.group({
      sheet:[null]
    })

    this.desciption = this.fb.group({
      desc:[null]
    })

    this.modalService.isClicked.subscribe((res:any)=>{
      this.window = false;
      this.offer = false;
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
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php").then(resData => {
      // console.log(resData.data)
      console.log(resData.data)
      for (let i = 0; i < resData.data.products.length; i++) {

        this.products[i] = {
          mtrl: resData.data.products[i].mtrl,
          name: resData.data.products[i].name,
          name1: resData.data.products[i].name1,
          code: resData.data.products[i].code,
          retail: resData.data.products[i].retailPrice,
          wholesale: resData.data.products[i].wholesalePrice,
          qty: 1,
           description :resData.data.products[i].description,
           data_sheet:resData.data.products[i].data_sheet,
          stock: resData.data.products[i].stock,
          img : resData.data.products[i].image,
          offer: resData.data.products[i].offer,
          hasOffer:resData.data.products[i].hasOffer,
          discount:resData.data.products[i].discount
        }
      }
    })
  }



   openOffer(item:any){
  this.offer = true;
  console.log(item);

     console.log(typeof(item.wholesalePrice))
    this.modalService.offer.subscribe((res:number)=> {
     localStorage.setItem("discound",JSON.stringify(res));
      this.offerprice = +item.wholesale - ((+item.wholesale * +res) / 100)
      console.log(this.offerprice)
      console.log(typeof(item.mtrl))
      let data ={
        product:item.mtrl,
        offer:JSON.stringify(this.offerprice),
        discount:res,
        show:"no"
      }
      console.log(data)
      axios.post("https://perlarest.vinoitalia.gr/php-auth-api/offers.php", data
      ).then(resData=>{
        console.log(resData.data)
        setTimeout(()=>{
          window.location.reload()
        },100)
      })
    })

  }
  test(e:any){

    if (e.target.checked == true){
      this.checked = true;
    }else{
      this.checked = false;
    }

    // console.log(this.checkBoxes[0])
    // console.log(e.target.checked)
    for(let i =0;i<this.checkBoxes.length;i++){
      this.checkBoxes[i].checked = false;
    }

    if (this.checked){
      e.target.checked = true;
    }
    else{
      e.target.checked = false;
    }
  }
  addToHomePage(item:any){
    console.log(item);


   axios.post("https://perlarest.vinoitalia.gr/php-auth-api/homepageoffer.php",{
     mtrl:item.mtrl,
     discount: item.discount
   }).then(resData=>{
     console.log(resData.data)
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
       // window.location.reload()
    })
      }



  deleteOffer(item:any){
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/deleteOffer.php",{
      mtrl: item.mtrl
    }).then(resData=>{
      console.log(resData.data)
      this.answer = resData.data.message
      setTimeout(()=>{
        window.location.reload()
      },800)
    })

  }





  }


