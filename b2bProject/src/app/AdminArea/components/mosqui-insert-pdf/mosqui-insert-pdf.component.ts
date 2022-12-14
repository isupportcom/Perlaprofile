import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-mosqui-insert-pdf',
  templateUrl: './mosqui-insert-pdf.component.html',
  styleUrls: ['./mosqui-insert-pdf.component.css']
})
export class MosquiInsertPdfComponent implements OnInit {

  //Subcategories
  subCategoriesExtraArray: any = [];


  pdfForm:FormGroup|any
  pdf:any;
  showList: boolean = false;
  selected:boolean=false;
  selectedId!: number;

  constructor(private fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {

    this.pdfForm = this.fb.group({
      pdf: ['', [Validators.required]]
    })

    axios.post('https://perlaNodeRest.vinoitalia.gr/products/getAllMosquiCat').then(resData => {
      console.log(resData.data.subcategories);
      this.subCategoriesExtraArray = resData.data.subcategories;
    })

    let req = await axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getPdfs.php",{
      method:"pdf"
     })
     console.log(req.data)
     this.pdf = req.data.pdf;
  }



  openDropDown(id:number){
    this.selected = true;
    this.selectedId = id;
    console.log(this.selectedId);
    
  }

  async uploadPdf(){
    if(this.selectedId != 0){
      console.log(this.selectedId);
      console.log(this.pdfForm.value.pdf);
      let req= await axios.post("https://perlaNodeRest.vinoitalia.gr/products/editMosquiPdfs",{
        sub_cat_id: this.selectedId,
        pdf: this.pdfForm.value.pdf
      })
      console.log(req.data);
      for(let i=0;i<this.subCategoriesExtraArray.length;i++){
        if(this.subCategoriesExtraArray[i].sub_id == req.data.subcategory.sub_id){
          this.subCategoriesExtraArray[i] = req.data.subcategory;
        }
      }
  
      this.close();
    }
  }

  close(){
    this.selected = false;
    this.selectedId = 0;
  }

  deletePDF(category: any,pdf: any){
    axios.post('https://perlaNodeRest.vinoitalia.gr/products/removePdf',{
      sub_cat_id: category,
      pdf: pdf
    }).then(resData => {
      console.log(resData);

      for(let i=0;i<this.subCategoriesExtraArray.length;i++){
        if(this.subCategoriesExtraArray[i].sub_id == resData.data.subcategory.sub_id){
          this.subCategoriesExtraArray[i] = resData.data.subcategory;
        }
      }
      
    })
  }
}
