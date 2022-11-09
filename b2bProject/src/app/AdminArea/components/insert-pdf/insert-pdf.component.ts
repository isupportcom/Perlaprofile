import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-insert-pdf',
  templateUrl: './insert-pdf.component.html',
  styleUrls: ['./insert-pdf.component.css']
})
export class InsertPdfComponent implements OnInit {
  products:any;
  search: string = "";
  pdfForm:FormGroup|any
  pdf:any;
  showList: boolean = false;
  constructor(private fb:FormBuilder) { }

  showListFunc(){  
    this.showList = !this.showList
  }
  async ngOnInit() {
    this.pdfForm = this.fb.group({
      pdf: ['', [Validators.required]]
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

  deletePDFfromDB(btn: any){
    
    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => {
        axios.post('https://perlarest.vinoitalia.gr/php-auth-api/deletePdf.php',{
          pdf_name: this.pdfForm.value.pdf
        })
        .then(resData => {
          console.log(resData.data)
          this.pdf = resData.data.pdf
          this.products = resData.data.products
        })
        this.showList = !this.showList;
        btn.classList.remove('loading');
      },2500)
    }
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

  deletePDF(btn: any,mtrl: any){
    
    
    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => {
        axios.post('https://perlarest.vinoitalia.gr/php-auth-api/removeSinglePdf.php',{
          mtrl: mtrl
        }).then(resData =>{
          this.products = resData.data.products
        })

        btn.classList.remove('loading')
      },2500)
    }
  }

  findProducts() {
    console.log('mpike gia res');
    if(this.search == ''){
      this.getProducts();
    }
    else{
      axios
        .post('https://perlarest.vinoitalia.gr/php-auth-api/search.php', {
          search: this.search,
        })
        .then((resData) => {
          console.log(resData.data.products);
          if (resData.data.products.length != 0) {
              this.products = resData.data.products;
          } 
          else {
            setTimeout(() => {
              this.getProducts();
            }, 100);
          }
        });
    }
  }

  
  getProducts(){
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php").then(resData => {
      // console.log(resData.data)
      console.log(resData.data)
      for (let i = 0; i < resData.data.products.length; i++) {

        this.products[i] = {
          mtrl: resData.data.products[i].mtrl,
          name: resData.data.products[i].name,
          name1: resData.data.products[i].name1,
          product_name: resData.data.products[i].onoma,
          code: resData.data.products[i].code,
          retail: resData.data.products[i].retailPrice,
          wholesale: resData.data.products[i].wholesalePrice,
          qty: 1,
           description :resData.data.products[i].description,
           data_sheet:resData.data.products[i].data_sheet,
          stock: resData.data.products[i].stock,
          image : resData.data.products[i].image,
          offer: resData.data.products[i].offer,
          hasOffer:resData.data.products[i].hasOffer,
          discount:resData.data.products[i].discount
        }
      }
    })
  }
  close(){
    this.selected = false;
  }

}
