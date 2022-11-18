import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-delete-catalogs',
  templateUrl: './delete-catalogs.component.html',
  styleUrls: ['./delete-catalogs.component.css']
})
export class DeleteCatalogsComponent implements OnInit {
  catalogueLinks: any = [];
  catalogueNames: any = [];
  // https://perlarest.vinoitalia.gr/php-auth-api/catalogues/
  constructor() { }

  ngOnInit(): void {
    axios.post('https://perlarest.vinoitalia.gr/php-auth-api/getCatalogues.php',{
      method: 'asd'
    }).then(resData =>{
      console.log(resData.data.pdf);
      
      for(let catalogue of resData.data.pdf){
        console.log(catalogue);
        
        this.catalogueNames.push(catalogue.catalogue);
      }
    }
    )
    console.log(this.catalogueNames);
    
    
  }


  removeCatalogue(catName: string){
    // console.log(name);
    axios.post('https://perlarest.vinoitalia.gr/php-auth-api/removeSingleCatalogue.php',{
      pdf_name: catName
    }).then(resData => {
      console.log(resData);
      
      this.catalogueNames = [];
      for(let catalogue of resData.data.catalogues){
        this.catalogueNames.push(catalogue.catalogues);
      }
      
    })
  }
}
