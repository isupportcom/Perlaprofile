import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-insert-pdf',
  templateUrl: './insert-pdf.component.html',
  styleUrls: ['./insert-pdf.component.css']
})
export class InsertPdfComponent implements OnInit {
  products:any;
  pdfForm:FormGroup|any
  pdf:any;
  constructor(private fb:FormBuilder) { }

  async ngOnInit() {
    this.pdfForm = this.fb.group({
      pdf:[null]
    })
     let req =  await axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php")


   console.log(req.data);

   this.products = req.data.products;
   req = await axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getPdfs.php",{
    method:"pdf"
   })
   console.log(req.data)
   this.pdf = req.data.pdf;

  }
  selected:boolean=false;
  selectedMtrl:any = ""
  openDropDown(mtrl:any){
    this.selected = true;
    this.selectedMtrl = mtrl;
  }
 async uploadPdf(){
    console.log(this.selectedMtrl);
    console.log(this.pdfForm.value.pdf);
    this.products.pdf = this.pdfForm.value.pdf
    let req= await axios.post("https://perlarest.vinoitalia.gr/php-auth-api/uploadPdfToProduct.php",{
      mtrl:this.selectedMtrl,
      pdfName:this.pdfForm.value.pdf
    })
    console.log(req.data);
    setTimeout(()=>{

      window.location.reload()

    },50)

  }

}
