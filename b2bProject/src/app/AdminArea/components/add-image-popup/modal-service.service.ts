import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ModalService {
  isClicked = new Subject<boolean>();
  castIsClicked = this.isClicked.asObservable();

  image = new Subject<string>();
  castImage = this.image.asObservable();

  openPopup(flag: boolean){
    this.isClicked.next(flag);
  }
  sendImage(image:string){
    this.image.next(image);
  }

}
