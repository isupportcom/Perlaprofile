import { Component, OnInit } from '@angular/core';
import {ModalService} from "./modal-service.service";
import axios from "axios";

@Component({
  selector: 'app-add-image-popup',
  templateUrl: './add-image-popup.component.html',
  styleUrls: ['./add-image-popup.component.css']
})
export class AddImagePopupComponent implements OnInit {
  isClicked:boolean=true;

  constructor(private modalService: ModalService) {}
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
    this.modalService.openPopup(false);
  }
    close(){
      this.modalService.openPopup(false);
  }

}
