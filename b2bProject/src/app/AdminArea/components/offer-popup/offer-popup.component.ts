import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import axios from 'axios';
import { CartServiceService } from 'src/app/cart/cart-service.service';
import {ModalService} from "../add-image-popup/modal-service.service";

@Component({
  selector: 'app-offer-popup',
  templateUrl: './offer-popup.component.html',
  styleUrls: ['./offer-popup.component.css']
})
export class OfferPopupComponent implements OnInit {
  contactForm:FormGroup|any;
  @Input() product: any;
  constructor(private cartService: CartServiceService,public fb:FormBuilder,private modalService:ModalService) { }

  ngOnInit(): void {
    console.log(this.product);
    
    this.contactForm = this.fb.group({

      offer:[null],

    });
  }
  close(){
    this.cartService.sendOpenOffer(false);
  }
  uploadOffer(){
    console.log(this.contactForm.value.offer)
    this.modalService.sendOffer(this.contactForm.value.offer)

  }


  clearOffer(btn:any){
    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => {
        this.deleteOffer(this.product)
        btn.classList.remove('loading')
      },2500)
    }
  }

  deleteOffer(item:any){
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/deleteOffer.php",{
      mtrl: item.mtrl
    }).then(resData=>{
      console.log(resData.data)
      setTimeout(()=>{
        // window.location.reload()
      },800)
    })

  }
}
