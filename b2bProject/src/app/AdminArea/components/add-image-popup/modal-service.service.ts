import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ModalService {
  isClicked = new Subject<boolean>();
  castIsClicked = this.isClicked.asObservable();


  image = new Subject<string>();
  castImage = this.image.asObservable();

  offer = new Subject<number>()
  castOffer = this.offer.asObservable();

  mosquiOther = new Subject<any>();
  castMosquiOther = this.mosquiOther.asObservable();

  sendMosquiOther(images: any){
    this.mosquiOther.next(images);
  }

  updateMosquiThumb = new Subject<string>();
  castUpdateMosquiThumb = this.updateMosquiThumb.asObservable();

  sendUpdateMosquiThumb(image: any){
    this.updateMosquiThumb.next(image);
  }

  deleteMosquiThumb = new Subject<any>();
  castDeleteMosquiThumb = this.deleteMosquiThumb.asObservable();

  sendDeleteMosquiThumb(category: any){
    this.deleteMosquiThumb.next(category);
  }

  imageName = new Subject<string>();
  castImageName = this.imageName.asObservable();

  sendImageName(image: string){
    this.imageName.next(image);
  }


  imagesUpdated = new Subject<any>();
  castImagesUpdated = this.imagesUpdated.asObservable();

  sendImagesUpdated(flag: any){
    this.imagesUpdated.next(flag);
  }

  products = new Subject<any>();
  prodCast = this.products.asObservable();

  sendProducts(products: any) {
    this.products.next(products);
  }

  sendOffer(offer:number){
    this.offer.next(offer)
  }

  openPopup(flag: boolean){
    this.isClicked.next(flag);
  }
  sendImage(image:string){
    this.image.next(image);
  }


}
