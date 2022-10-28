import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { CartServiceService } from 'src/app/cart/cart-service.service';
import {ModalService} from "../add-image-popup/modal-service.service";

@Component({
  selector: 'app-offer-popup',
  templateUrl: './offer-popup.component.html',
  styleUrls: ['./offer-popup.component.css']
})
export class OfferPopupComponent implements OnInit {
  contactForm:FormGroup|any;
  constructor(private cartService: CartServiceService,public fb:FormBuilder,private modalService:ModalService) { }

  ngOnInit(): void {
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

}
