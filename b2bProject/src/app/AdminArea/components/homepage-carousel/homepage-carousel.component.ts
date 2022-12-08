import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';
import { CartServiceService } from 'src/app/cart/cart-service.service';
import { ProductsService } from 'src/app/porducts/products.service';
import { ModalService } from '../add-image-popup/modal-service.service';

@Component({
  selector: 'app-homepage-carousel',
  templateUrl: './homepage-carousel.component.html',
  styleUrls: ['./homepage-carousel.component.css']
})
export class HomepageCarouselComponent implements OnInit {
  carousel:FormGroup | any

  flag: boolean = false;
  window: boolean = false;


  mainCategories: any;
  goToProductsArr: any;

  controlRoute: any;
  motionRoute: any;
  mosquiRoute = '/products/116/Mosqui';
  profileRoute = '/products/117/Profile';
  accessoriesRoute: any;

  message!: string;
  error: boolean = false;
  success: boolean = false;

  imageName!: string;
  constructor(private fb: FormBuilder,private cartService: CartServiceService,private modalService: ModalService,private productsService: ProductsService) { }

  ngOnInit(): void {

    this.carousel = this.fb.group({
      id:[null],
      text :[null],
      image:[{value: null, disabled: true}],
      route:[null]
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

    this.modalService.imageName.subscribe(resData => {
      console.log(resData);
      this.imageName = resData;
    })



    this.productsService.getMainCategories().subscribe(resData => {
      let subcategories: any;
      let first_subcat: any;
      let infoToPush: any;
      this.mainCategories = resData;
      console.log(this.mainCategories);
      this.goToProductsArr = [];
      this.mainCategories.forEach((mainCategory: any) => {


          this.productsService.getAllCategories(mainCategory.id).subscribe((resData: any) => {
            console.log(resData.categories[0].subcategories);
            subcategories = resData.categories[0].subcategories;
            first_subcat = subcategories[0];
            // console.log(first_subcat);
            infoToPush= {
              main_id: mainCategory.id,
              main_name: mainCategory.name,
              sub_id: first_subcat.sub_id,
              sub_name: first_subcat.name
            }

            if(infoToPush.main_id == 114){
              this.controlRoute = '/products/114/Control/'+infoToPush.sub_id+'/'+infoToPush.sub_name
            }

            if(infoToPush.main_id == 115){
              this.motionRoute = '/products/115/Motion/'+infoToPush.sub_id+'/'+infoToPush.sub_name
            }

            if(infoToPush.main_id == 118){
              this.accessoriesRoute = '/products/118/Accessories/'+infoToPush.sub_id+'/'+infoToPush.sub_name
            }

            this.goToProductsArr.push(infoToPush);
          })
        });
        console.log(this.goToProductsArr);


      })

  }

  open(){
    this.flag = true;
    this.window =true;
  }

  upload(){
    console.log(this.carousel.value);


    axios.post('https://perlaNodeRest.vinoitalia.gr/carousel/setCarousel',{
      slider: this.carousel.value.id,
      image:  this.imageName,
      text :  this.carousel.value.text,
      route:  this.carousel.value.route
    })
    .then(resData=>{
      console.log(resData.data)
      this.error = false;
      this.success = true;
      this.message = 'Όλα πήγαν καλά.'
    }).catch(err => {
      this.error = true;
      this.success = false;
      this.message = 'Κάτι πήγε στραβά. Προσπαθήστε ξανά.'
    })
  }
}
