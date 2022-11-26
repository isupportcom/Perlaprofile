import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { grouping, product } from './AdminArea/adminareaproducts/adminareaproducts.component';
import { CartServiceService } from './cart/cart-service.service';
import { ProductsService } from './porducts/products.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  backOrder: boolean = false;
  backOrder2: boolean = false;
  backOrder3: boolean = false;
  title = 'b2bProject';
  age = '10';
  loggedIn: boolean = true;
  productAdded?: boolean = false;
  waiting?: boolean = false;
  TopScroll: any;
  LeftScroll: any;
  products: product[] = [];
  singleProduct: any;
  scope3 : any = [];
  relatedProducts:product|any = [];
  group: any;
  showScope3: boolean = false;
  itemsToCart: product|any = [];
  tempGroup: grouping[] | any = [];
  date = new Date();
  btnLoading: boolean = false;

  changeBtn?: boolean;
  constructor(

    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cartService: CartServiceService,
    private renderer: Renderer2,
    private productService: ProductsService,
    private translate: TranslateService
  ) {

  }
  innerWidth:any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 768){
      this.changeBtn = true;
    }
    else{
      this.changeBtn = false;
    }
  }


  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 768){
      this.changeBtn = true;
    }
    else{
      this.changeBtn = false;
    }

    this.productService.backOrderPopup.subscribe(resData => {
      if(resData){
        this.backOrder = resData
      }

    });

    this.productService.backOrderPopup2.subscribe(resData => {
      if(resData){
        this.backOrder2 = resData
      }

    });

    this.productService.backOrderPopup3.subscribe(resData => {
      if(resData){
        this.backOrder3 = resData
      }

    });

    console.log(this.date.getHours()+':'+this.date.getMinutes());

    this.authService.autoLogin();
    if (localStorage.getItem('username') == 'Admin') {
      this.authService.setAdmin(true);
    }

    this.route.data.subscribe((data: Data) => {
      console.log(data);
    });
    this.authService.loggedIn.subscribe((res) => {


      this.loggedIn = res;

    });



    this.cartService.startScope.subscribe(res => {
      this.tempGroup = [];
      this.relatedProducts = [];
      this.itemsToCart = [];
      // this.products = this.productService.getAll();
      this.singleProduct = this.productService.getSingelProduct();

      let relatedProductsObs: Observable<any>;

      relatedProductsObs = this.productService.getRelatedProducts(this.singleProduct.mtrl);

      relatedProductsObs.subscribe(resData => {
        this.relatedProducts = resData.related;
      })
      setTimeout(async() => {
        console.log(this.relatedProducts);
        for(let relatedProd of this.relatedProducts){
          let groupingObs: Observable<any>;
          let temp;
          relatedProd.qty = this.singleProduct.qty;
          let scope2b;
          groupingObs = await this.productService.setGrouping(this.singleProduct.mtrl,relatedProd.grouping);

          groupingObs.subscribe(resData => {
            console.log(resData);
            this.scope3 = resData.Scope3;
            for(let i=0; i<this.scope3.length; i++){
              this.scope3[i].qty = this.singleProduct.qty;
            }

            scope2b = resData.Scope2[0];
            scope2b.qty = this.singleProduct.qty;
            temp = {
              scope1: relatedProd,
              scope2: resData.Scope2[0]
            };
            this.tempGroup.push(temp);

          });
        }
      },500);
      console.log(this.tempGroup);
      console.log(this.itemsToCart);


      this.productAdded = true;

    })


    // this.router.navigate(['log-in'])

  }


  handleGrouping(product: any,btn: any){

    if(+this.singleProduct.diathesima <= 0){
      this.itemsToCart = []
      this.itemsToCart.push(this.singleProduct)
      btn.style.opacity = '1';
      this.btnLoading = true;

      if(!btn.classList.contains('loading')) {
        btn.classList.add('loading');
        setTimeout(() => {
        let flag = false;
        let scope1;
        let scope2;
        // console.log("HANDLE GROUPING");
        // console.log(this.tempGroup);
        // console.log(product);
        for(let temp of this.tempGroup){
          if(temp.scope1.mtrl == product.mtrl){
            flag = true;
            scope1 = temp.scope1;
            scope2 = temp.scope2;
          }
        }

        if(flag == true){
          this.itemsToCart.push(scope1)
            this.itemsToCart.push(scope2)
            console.log(this.itemsToCart);
            this.productAdded = false;
            this.btnLoading = false;
            if(this.scope3.length > 0){
              this.showScope3 = true;
            }
            else{
              this.stopScope();
            }
        }
        console.log(this.itemsToCart);





        btn.classList.remove('loading');
        },2500)
      }
    }
    else{
      this.itemsToCart = []
      this.itemsToCart.push(this.singleProduct)
      btn.style.opacity = '1';
      this.btnLoading = true;
      console.log(this.btnLoading);

      if(!btn.classList.contains('loading')) {
        btn.classList.add('loading');
        setTimeout(() => {
          let flag = false;
          let scope1: any;
          let scope2: any;
          for(let temp of this.tempGroup){
            if(temp.scope1.mtrl == product.mtrl){
              flag = true;
              scope1 = temp.scope1;
              scope2 = temp.scope2;
            }
          }

          if(flag == true){
            if(scope1.diathesima <= 0 || scope2.diathesima <= 0){
              this.productService.sendBackOrderPopup3(true);

              this.productService.backOrder3.subscribe(resData => {
                if(resData){
                  if(this.btnLoading || this.productAdded){
                    this.itemsToCart.push(scope1)
                    this.itemsToCart.push(scope2)
                    console.log(this.itemsToCart);
                    this.productAdded = false;
                    this.btnLoading = false;
                  }
                  if(this.scope3.length > 0){
                    this.showScope3 = true;

                  }
                  else{
                    this.stopScope();
                  }
                }
              })
          }
          else{

            if(this.btnLoading || this.productAdded){
              this.itemsToCart.push(scope1)
              this.itemsToCart.push(scope2)
              console.log(this.itemsToCart);
              this.productAdded = false;
              this.btnLoading = false;
            }
            if(this.scope3.length > 0){
              this.showScope3 = true;
            }
            else{
              this.stopScope();
            }
          }
          }
          this.renderer.setStyle(btn, 'opacity', '');
          btn.classList.remove('loading');
        },2500)
      }


    }





  }

  hanldeScope3(product: any,btn?: any){

    if(+this.singleProduct.diathesima <= 0){
      btn.style.opacity = '1';
      this.btnLoading = true;
      if(!btn.classList.contains('loading')) {
        btn.classList.add('loading');
        setTimeout(() => {
          if(this.btnLoading || this.showScope3){
            this.itemsToCart.push(product);
            console.log(this.itemsToCart);

            this.removeDuplicates();
            console.log("PEOS")
            this.addToCart();
            this.showScope3 = false;
            this.btnLoading = false;
          }
          btn.classList.remove('loading');
        }, 1200);
      }

    }
    else{
      if(+product.diathesima > 0){


        btn.style.opacity = '1';
        this.btnLoading = true;
        if(!btn.classList.contains('loading')) {
          btn.classList.add('loading');
          setTimeout(() => {
            if(this.btnLoading || this.showScope3){
              this.itemsToCart.push(product);
              console.log(this.itemsToCart);

              this.removeDuplicates();
              console.log("PEOS")
              this.addToCart();
              this.showScope3 = false;
              this.btnLoading = false;
            }
            btn.classList.remove('loading');
          }, 1200);
        }

      }
      else{

        this.productService.sendBackOrderPopup2(true);

        this.productService.backOrder2.subscribe(resData => {
          if(resData){
            btn.style.opacity = '1';
            this.btnLoading = true;
            if(!btn.classList.contains('loading')) {
              btn.classList.add('loading');
              setTimeout(() => {
                if(this.btnLoading || this.showScope3){
                  this.itemsToCart.push(product);
                  console.log(this.itemsToCart);




                  this.removeDuplicates();
                  console.log("PEOS")
                  this.addToCart();
                  this.showScope3 = false;
                  this.btnLoading = false;
                }
                btn.classList.remove('loading');
              }, 1200);
            }
          }
        })


      }
    }
  }

  removeDuplicates(){
    let temp: {
      mtrl: any,
      counter: any
    }[] = [];

    for(let i=0;i<this.itemsToCart.length;i++){
      temp.push({
        mtrl: this.itemsToCart[i].mtrl,
        counter: 0
      })
    }
    console.log(temp);



    for(let i=0;i<this.itemsToCart.length;i++){
      for(let k=0;k<temp.length;k++){
        if(temp[k].mtrl == this.itemsToCart[i].mtrl){
          if(temp[k].counter == 0){
            temp[k].counter ++
          }
          else{
            temp[k].counter ++
            this.itemsToCart.splice(i,1);
          }
        }
      }
    }

    console.log(temp);
    console.log(this.itemsToCart);
  }

 async addToCart(){
    console.log("PEOS")
    let id = '';


    for(let prod of this.itemsToCart){
      id = id + prod.mtrl;
    }
    this.cartService.setId(id)
    console.log(id);


    for(let prod of this.itemsToCart){
      // id = id + prod.mtrl;
      prod.group_id = id;

      console.log(prod);


      await this.cartService.addToCart(prod);
      setTimeout(()=>{

        this.cartService.sendProductAdded(true);
      },100)

    }
    this.itemsToCart = [];
  }

  stopScope(){
    this.btnLoading = false;
    this.relatedProducts = [];
  }

  stopScope2(){
    this.btnLoading = false;
    this.showScope3 = false;
  }

  continueBackOrder(){
      this.productService.sendBackOrderPopup(false);
      this.productService.sendBackOrder(true);
      this.backOrder = false;

  }

  stopBackOrder(){
      this.productService.sendBackOrderPopup(false);
      this.productService.sendBackOrder(false);
      this.backOrder = false;
  }

  continueBackOrder3(){
    // this.productService.sendBackOrderPopup3(false);
    this.btnLoading = false;
    this.productService.sendBackOrder3(true);
    this.backOrder3 = false;

  }

  stopBackOrder3(){
    // this.productService.sendBackOrderPopup3(false);
    this.btnLoading = false;
    this.productService.sendBackOrder3(false);
    this.backOrder3 = false;
  }


  continueBackOrder2(){
    this.productService.sendBackOrderPopup2(false);
    this.btnLoading = false;
    this.productService.sendBackOrder2(true);
    this.backOrder2 = false;

  }

  stopBackOrder2(){
    this.productService.sendBackOrderPopup2(false);
    this.btnLoading = false;
      this.productService.sendBackOrder2(false);
      this.backOrder2 = false;
  }

  handleClose(){

    this.productAdded = false;

    window.location.reload();
  }

  handleGoToCart() {
    this.productAdded = false;
    this.router.navigate(['cart']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }


}
