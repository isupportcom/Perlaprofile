import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CartServiceService } from 'src/app/cart/cart-service.service';
import { ProductsService } from 'src/app/porducts/products.service';
import { SwiperComponent } from 'swiper/angular';
import { ModalService } from '../add-image-popup/modal-service.service';

@Component({
  selector: 'app-mosqui-insert-image',
  templateUrl: './mosqui-insert-image.component.html',
  styleUrls: ['./mosqui-insert-image.component.css']
})
export class MosquiInsertImageComponent implements OnInit {
  //Swiper
  onSwiper(e: Event) {

  }
  onSlideChange(swiper: SwiperComponent) {

  }

  thumbsSwiper: any;
  setThumbsSwiper(swiper: any){
    this.thumbsSwiper = swiper;
  }
  
  //Subcategories
  subCategoriesExtraArray: any = [];


  //Add Image Popup
  flag: boolean = false;
  window: boolean = false;


  //Images to insert
  images: any;

  //Selected Category 
  selectedCategory: any;


  constructor(private productsService: ProductsService,private cartService: CartServiceService,private modalService: ModalService) { }

  ngOnInit(): void {

    axios.post('https://perlaNodeRest.vinoitalia.gr/products/getAllMosquiCat').then(resData => {
      console.log(resData.data.subcategories);
      this.subCategoriesExtraArray = resData.data.subcategories;
    })


    this.cartService.addImagePopup.subscribe((resData) => {
      if (resData == false) {
        this.flag = false;
        this.window = false;
      } else {
        console.log(resData);
        this.flag = true;
        this.window = true;
      }
    });

    this.modalService.mosquiOther.subscribe(resData => {
      setTimeout(() => {
        this.images = resData;
        console.log(this.images);
        // console.log(this.selectedCategory);
        axios.post('https://perlaNodeRest.vinoitalia.gr/products/editMosquiOtherImages',
        {
          sub_cat_id: this.selectedCategory,
          images: this.images
        }
        ).then(resData => {
          // console.log(resData.data.subcategory.sub_id);
          for(let i=0;i<this.subCategoriesExtraArray.length;i++){
            if(this.subCategoriesExtraArray[i].sub_id == resData.data.subcategory.sub_id){
              this.subCategoriesExtraArray[i] = resData.data.subcategory;
            }
          }
          
          
        })
      },1000)

    })


  }
  removeImage(selected_cat: any, image: any){
    console.log(image.image);
    
    axios.post('https://perlaNodeRest.vinoitalia.gr/products/removeOtherImages',
    {
      sub_cat_id: selected_cat,
      image: image.image
    }
    ).then(resData => {

      for(let i=0;i<this.subCategoriesExtraArray.length;i++){
        if(this.subCategoriesExtraArray[i].sub_id == resData.data.subcategory.sub_id){
          this.subCategoriesExtraArray[i] = resData.data.subcategory;
        }
      }
    })
  }


  openImagePopup(selected_cat: any){
    this.selectedCategory = selected_cat;

    this.flag = true;
    this.window = true;
  }

}
