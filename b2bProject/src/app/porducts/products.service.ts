import {Injectable} from "@angular/core";
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";
import {Subject} from "rxjs";

@Injectable({
  providedIn: "root"
  }
)
export  class ProductsService {
  products = new Subject<product>();
  cast = this.products.asObservable();

  sendProducts(products: product){
    this.products.next(products);
  }
}
