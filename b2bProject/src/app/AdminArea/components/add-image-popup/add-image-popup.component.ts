import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from './modal-service.service';
import axios from 'axios';
import { CartServiceService } from 'src/app/cart/cart-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-image-popup',
  templateUrl: './add-image-popup.component.html',
  styleUrls: ['./add-image-popup.component.css'],
})
export class AddImagePopupComponent implements OnInit {
  @Input() secondary?: boolean;
  isClicked: boolean = true;
  searchPhoto: FormGroup | any;
  constructor(
    private cartService: CartServiceService,
    private modalService: ModalService,
    private fb:FormBuilder
  ) {}
  images: string | any = [];

  ngOnInit(): void {

    this.searchPhoto = this.fb.group({

      imageName:[null]

    })

    axios
      .get(
        'https://perlarest.vinoitalia.gr/php-auth-api/getImages.php/?id=9&method=allImages'
      )
      .then((photoName) => {
        console.log(photoName);
        for (let i = 0; i < photoName.data.length; i++) {
          this.images[i] =
            'https://perlarest.vinoitalia.gr/php-auth-api/upload/' +
            photoName.data[i].image;
        }
      });
  }
  sendNUDES(image: string) {
    this.modalService.sendImage(image);
    this.cartService.sendAddImagePopup(false);
  }
  searchPhotoByName(){
    console.log(this.searchPhoto.value.imageName)

    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/searchPhoto.php",{
      search:this.searchPhoto.value.imageName
    })
    .then(photoName=>{
      this.images = [];
      this.images[0] = photoName.data.search;
    })



    this.searchPhoto.reset();
  }
  close() {
    if (this.secondary) {
      window.location.reload();
    } else {
      this.cartService.sendAddImagePopup(false);
    }
  }
}
