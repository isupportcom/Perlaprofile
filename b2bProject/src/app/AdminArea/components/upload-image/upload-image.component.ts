import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UploadImageService} from "./upload-image.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent  {

  imageUrl :any = null;
  photo: Blob|any;

  constructor(private _service: UploadImageService,
              public _DomSanitizationService: DomSanitizer) { }

  setPhoto(event:any){
    this.photo = event.target.files[0];
  }
  onClickSubmit(){
    const fd = new FormData();
    fd.append('stphoto',this.photo);
    this._service.postImage(fd).subscribe(res => console.log(res));
  }
  showImage(){

    this._service.getImage().subscribe((res) => {
      this.photo = res;
      var myReader:FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.imageUrl = this._DomSanitizationService.bypassSecurityTrustUrl(<string>myReader.result);
      }
      myReader.readAsDataURL(this.photo);
    });
  }
}
