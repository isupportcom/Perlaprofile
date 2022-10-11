import { Injectable } from "@angular/core";
import {TranslateService} from '@ngx-translate/core'
import { Subject } from "rxjs";
@Injectable({
  providedIn:'root'
})
export class TranslateConfigService{

  constructor(public translateService: TranslateService){

    this.translateService.setDefaultLang(localStorage.getItem('lang') ||'en');

    console.log(this.translateService.currentLang);

  }
  changeLanguage(type:string){
    this.translateService.use(type);
    localStorage.setItem('lang',type)
  }
  currentLang(){
    return this.translateService.currentLang
  }
 async getPage(){
   let team =  this.translateService.get('team')
    return team

  }
}
