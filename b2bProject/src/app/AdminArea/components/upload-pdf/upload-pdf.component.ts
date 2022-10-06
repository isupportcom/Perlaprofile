import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadPdfService } from './upload-pdf.service';

@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.css']
})
export class UploadPdfComponent implements OnInit {
  pdfForm:FormGroup|any
  progress:number =0
  msg:string = "";
  constructor(
    private fb : FormBuilder,
    private pdfService : UploadPdfService
  ) { }

  ngOnInit(): void {

    this.pdfForm = this.fb.group({
        pdf:[null]
    })

  }
  uploadPDF(){
    console.log(this.pdfForm.value.pdf)

    this.pdfService.pdfUpload(this.pdfForm.value.pdf).subscribe((event:HttpEvent<any>)=>{

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
    this.pdfForm.patchValue({
      pdf:file
    })
    this.pdfForm.get('pdf')?.updateValueAndValidity();

  }

}
