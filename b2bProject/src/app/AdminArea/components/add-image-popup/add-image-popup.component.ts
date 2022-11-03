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
  imagesArr :string|any= [];
  searchPhoto: FormGroup | any;
  constructor(
    private cartService: CartServiceService,
    private modalService: ModalService,
    private fb:FormBuilder
  ) {}
  images: string | any = [];
  imagesNames: string[] = [];

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
          this.imagesNames.push(photoName.data[i].image)
          this.images[i] =
            'https://perlarest.vinoitalia.gr/php-auth-api/upload/' +
            photoName.data[i].image;
        }
      });
  }
  sendNUDES(image: string) {
    this.imagesArr.push(image);
    // console.log(this.imagesArr);

    // this.modalService.sendImage(image);
    // this.cartService.sendAddImagePopup(false);
  }
  addImages(){

    console.log(this.imagesArr)
    this.modalService.sendImage(this.imagesArr);

  }
  searchPhotoByName(){
    console.log(this.searchPhoto.value.imageName)

    if(this.searchPhoto.value.imageName == null){

      axios
      .get(
        'https://perlarest.vinoitalia.gr/php-auth-api/getImages.php/?id=9&method=allImages'
      )
      .then((photoName) => {
        console.log(photoName);

        for (let i = 0; i < photoName.data.length; i++) {
          this.imagesNames.push(photoName.data[i].image)
          this.images[i] =
            'https://perlarest.vinoitalia.gr/php-auth-api/upload/' +
            photoName.data[i].image;
        }
      });
    }
    else{
      axios.post("https://perlarest.vinoitalia.gr/php-auth-api/searchPhoto.php",{
        search:this.searchPhoto.value.imageName
      })
      .then(photoName=>{
        console.log(photoName);
        this.imagesNames = [];
        this.images = [];
        // this.images[0] = photoName.data.search;
        for(let image of photoName.data.images){

          this.images.push(image.image);
          this.imagesNames.push(image.name);
        }
      })



      this.searchPhoto.reset();
    }


  }
  close() {
    if (this.secondary) {

      this.cartService.sendAddImagePopup(false);
      // window.location.reload();
    } else {
      this.cartService.sendAddImagePopup(false);
    }
  }
}
