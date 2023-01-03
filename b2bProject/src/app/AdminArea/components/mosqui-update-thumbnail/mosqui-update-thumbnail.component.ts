import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CartServiceService } from 'src/app/cart/cart-service.service';
import { ProductsService } from 'src/app/porducts/products.service';
import { ModalService } from '../add-image-popup/modal-service.service';

@Component({
  selector: 'app-mosqui-update-thumbnail',
  templateUrl: './mosqui-update-thumbnail.component.html',
  styleUrls: ['./mosqui-update-thumbnail.component.css']
})
export class MosquiUpdateThumbnailComponent implements OnInit {

  //Subcategories
  subCategoriesExtraArray: any = [];

  //Add Image Popup
  flag: boolean = false;
  window: boolean = false;



  //Selected Category
  selectedCategory: any; // --> id
  categoryToSend: any; // --> oloklhrh kathgoria

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

    this.modalService.updateMosquiThumb.subscribe(resData => {

      setTimeout(()=>{


        console.log(resData);
        console.log(this.selectedCategory);
        axios.post('https://perlaNodeRest.vinoitalia.gr/products/editMosquiImage',
        {
          image: resData,
          sub_cat_id: this.selectedCategory
        }).then(resData => {
          for(let i=0;i<this.subCategoriesExtraArray.length;i++){
            if(this.subCategoriesExtraArray[i].sub_id == resData.data.subcategory.sub_id){
              this.subCategoriesExtraArray[i] = resData.data.subcategory;
            }
          }
        })

      },500)

    })

    this.modalService.deleteMosquiThumb.subscribe(resData => {
      setTimeout(()=>{

        console.log(resData);
        axios.post('https://perlaNodeRest.vinoitalia.gr/products/removeMosquiThumb',{
          sub_cat_id: resData.sub_id
        }).then(resData => {
          this.subCategoriesExtraArray = resData.data.subcategories;
        })
      },500)
      })

  }




  openImagePopup(selected_cat: any,category: any){
    this.selectedCategory = selected_cat;
    this.categoryToSend = category;

    this.flag = true;
    this.window = true;
  }
}
