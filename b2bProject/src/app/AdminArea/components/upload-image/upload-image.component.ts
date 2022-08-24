import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UploadImageService} from "./upload-image.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import axios from "axios";
import {product} from "../../adminareaproducts/adminareaproducts.component";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit{
  isChecked:boolean|any;
  isCheckedName:string|any;
  products : product | any = [];
  page = 0;
  mtrl : number |any;
  ngOnInit(): void {
    axios.get("https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php/?id=2&method=allProducts").then(resData => {
      // console.log(resData.data)
      console.log(resData.data)
      for (let i = 0; i < resData.data.length; i++) {

        this.products[i] = {
          mtrl: resData.data[i].mtrl,
          name: resData.data[i].name,
          name1: resData.data[i].name1,
          code: resData.data[i].code,
          retail: resData.data[i].retailPrice,
          wholesale: resData.data[i].wholesalePrice,
          qty: 1,
          stock: resData.data[i].stock,
          img : "empry"
        }
      }
    })
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
      mtrls: this.mtrl
    })
  }
  test(event:any,item:any){
    this.isChecked = !this.isChecked;
    this.isCheckedName = event.target.name;
    if(event.target.checked){
      this.mtrl=item;
    }else{
        this.mtrl="";
        }
    console.log(this.mtrl)
      }



  submitImage(){
    console.log(this.form.value.image)
    console.log(this.form.value.mtrls)
    if(this.form.value.mtrls && this.form.value.image ){
      this.uploadImageService.imageUpload(this.form.value.image).subscribe((event:HttpEvent<any>)=>{
        switch (event.type) {

          case HttpEventType.UploadProgress: var eventTotal = event.total ?event.total :0;
            if(event.total){
              this.progress = Math.round((100/event.total)*event.loaded);
              this.msg = `Uploaded! ${this.progress}%`
            }
            break;
          case HttpEventType.Response :
            if(event.body.succes != undefined){
              this.msg = this.msg +" " + event.body.succes
            }else{
              this.msg = event.body.error;
            }

            break;

        }
      })
    }else{
      this.msg = "DEN MPOREIS EIPAME TI EPIMENEIS"
    }

  }
  uploadFile(event:any){
    let file = event.target.files? event.target.files[0] : '';
    console.log(file);
    if(this.mtrl != ""){
      this.form.patchValue({
        image:file,
        mtrl:this.mtrl
      });
      this.form.get('image')?.updateValueAndValidity()
    }
    else{
      this.msg="BALE PROION REEEEEEEEEEE";
    }

  }
}
