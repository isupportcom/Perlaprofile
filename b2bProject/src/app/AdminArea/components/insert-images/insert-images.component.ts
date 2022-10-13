import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {product} from "../../adminareaproducts/adminareaproducts.component";
import {ModalService} from "../add-image-popup/modal-service.service";
import {CartServiceService} from "../../../cart/cart-service.service";

@Component({
  selector: 'app-insert-images',
  templateUrl: './insert-images.component.html',
  styleUrls: ['./insert-images.component.css']
})
export class InsertImagesComponent implements OnInit {
  products :product |any =[];
  window:boolean = false
  flag:boolean = false;
  image:string ="";
  constructor(private modalService : ModalService,private cartServiceService: CartServiceService) { }

  ngOnInit(): void {
    this.cartServiceService.searchResult.subscribe((res:any)=>{
      console.log(res)
      this.products = res
;
    })
   axios.post("https://perlarest.vinoitalia.gr/php-auth-api/secondaryImages.php",{
     mtrl:"mtrl",
     img:"img",
     mode:"getimage"
   }).then(resData=>{
     console.log( resData.data.products)
     this.products = resData.data.products

   })
    this.modalService.isClicked.subscribe((res:any)=>{
      this.window = false;
    })

  }
  openMain(item:any){
    this.flag = true;
    this.window = true;
    this.modalService.image.subscribe((res:any)=>{
      this.image = res;
      axios.get("https://perlarest.vinoitalia.gr/php-auth-api/updateSingleImage.php/?id=11&mtrl="+item.mtrl+"&image="+this.image)
      .then(res=> {
        console.log(res.data)
        setTimeout(()=>{
          window.location.reload()
       },500)
      })
    })
  }
  open(item:any){
    this.flag = true;
    this.window =true;
    this.modalService.image.subscribe((res:any)=> {
      this.image = res
      console.log(this.image)
      console.log(res)
      console.log(item);

      axios.post("https://perlarest.vinoitalia.gr/php-auth-api/secondaryImages.php",{
        mtrl:item.mtrl,
        img:this.image,
        mode:"insert"
      }).then(res=>{
        console.log(res)
        setTimeout(()=>{
           window.location.reload()
        },500)

      })
    })
  }
  remove(item:any,img:any){
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/secondaryImages.php",{
      mtrl:item,
      img:img,
      mode:"remove"
    }).then(res=>{
      console.log(res)
      setTimeout(()=>{
        window.location.reload()
      },500)

    })

  }



}
