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
  product_page: product |any;

  sendProducts(products: product){
    this.products.next(products);
  }

  productDetails = new Subject<Object>();
  castProductDetails = this.productDetails.asObservable();

  sendProductDetails(obj: Object){
    this.productDetails.next(obj);
  }

  getIndex(){
    return this.product_page
  }
  setIndex(index:product){
      this.product_page = index;
  }

}
