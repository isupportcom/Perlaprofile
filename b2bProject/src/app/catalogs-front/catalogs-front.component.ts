import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-catalogs-front',
  templateUrl: './catalogs-front.component.html',
  styleUrls: ['./catalogs-front.component.css']
})
export class CatalogsFrontComponent implements OnInit {
  catalogueNames: any = [];
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
  }

}
