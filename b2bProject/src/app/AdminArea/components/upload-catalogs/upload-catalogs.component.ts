import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { product } from '../../adminareaproducts/adminareaproducts.component';
import { UploadImageService } from '../upload-image/upload-image.service';

@Component({
  selector: 'app-upload-catalogs',
  templateUrl: './upload-catalogs.component.html',
  styleUrls: ['./upload-catalogs.component.css']
})
export class UploadCatalogsComponent implements OnInit {
  isChecked:boolean|any;
  isCheckedName:string|any;
  products : product | any = [];
  page = 0;
  mtrl : number |any;
  ngOnInit(): void {


      // for (let i = 0; i < resData.data.length; i++) {
      //   console.log(resData.data[i].image)
      //   this.products[i] = {
      //     mtrl: resData.data[i].mtrl,
      //     name: resData.data[i].name,
      //     name1: resData.data[i].name1,
      //     code: resData.data[i].code,
      //     retail: resData.data[i].retailPrice,
      //     wholesale: resData.data[i].wholesalePrice,
      //     qty: 1,
      //     stock: resData.data[i].stock,
      //     img : resData.data[i].image
      //   }
      // }

  }

  form :FormGroup|any;
  progress:number =0
  msg="";
  name: any;
  constructor(
    public fb:FormBuilder,
    public uploadImageService: UploadImageService
  ) {
    this.form = this.fb.group({
      image:[null],

    })
  }
  // test(event:any,item:any){
  //   this.isChecked = !this.isChecked;
  //   this.isCheckedName = event.target.name;
  //   if(event.target.checked){
  //     this.mtrl=item;
  //   }else{
  //     this.mtrl="";
  //   }
  //   console.log(this.mtrl)
  // }



  submitImage(){
    console.log(this.form.value.image)
    console.log(this.mtrl);

    this.uploadImageService.imageUpload(this.form.value.image,this.mtrl).subscribe((event:HttpEvent<any>)=>{
      ;

      switch (event.type) {

        case HttpEventType.UploadProgress: var eventTotal = event.total ?event.total :0;
          if(event.total){

            this.progress = Math.round((100/event.total)*event.loaded);
            this.msg = `Uploaded! ${this.progress}%`
          }
          break;
        case HttpEventType.Response :
          if(event.body.succes != undefined){
            console.log(event.body);

            this.msg = this.msg +" " + event.body.succes
          }else{
            console.log(event.body)
            this.msg = event.body.success || event.body.error;
          }

          break;

      }
    })



  }
  uploadFile(event:any){
    let file = event.target.files? event.target.files[0] : '';
    console.log(file);

    this.form.patchValue({
      image:file,
      mtrl:this.mtrl
    });
    this.form.get('image')?.updateValueAndValidity()
  }




}
