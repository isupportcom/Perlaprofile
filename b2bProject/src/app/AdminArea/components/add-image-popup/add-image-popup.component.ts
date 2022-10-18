import { Component, Input, OnInit } from '@angular/core';
import {ModalService} from "./modal-service.service";
import axios from "axios";
import { CartServiceService } from 'src/app/cart/cart-service.service';

@Component({
  selector: 'app-add-image-popup',
  templateUrl: './add-image-popup.component.html',
  styleUrls: ['./add-image-popup.component.css']
})
export class AddImagePopupComponent implements OnInit {
  @Input() secondary?: boolean;
  isClicked:boolean=true;

  constructor(private cartService: CartServiceService,private modalService: ModalService) {}
    images:string |any= [];


    ngOnInit(): void {
      axios.get("https://perlarest.vinoitalia.gr/php-auth-api/getImages.php/?id=9&method=allImages")
        .then(photoName=>{
          console.log(photoName)
          for(let i =0;i<photoName.data.length;i++){
            this.images[i] ="https://perlarest.vinoitalia.gr/php-auth-api/upload/"+photoName.data[i].image;
          }

        })

    }
  sendNUDES(image:string){
      this.modalService.sendImage(image);
      this.cartService.sendAddImagePopup(false);
  }
    close(){
      if(this.secondary){
        window.location.reload();
      }
      else{
        this.cartService.sendAddImagePopup(false);
      }
  }

}
