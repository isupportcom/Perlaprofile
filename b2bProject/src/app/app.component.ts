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
      this.products = this.productService.getAll();
      this.singleProduct = this.productService.getSingelProduct();

      let relatedProductsObs: Observable<any>;

      relatedProductsObs = this.productService.getRelatedProducts(this.singleProduct.mtrl);

      relatedProductsObs.subscribe(resData => {
        this.relatedProducts = resData.related;
      })
      setTimeout(() => {
        console.log(this.relatedProducts);
        for(let relatedProd of this.relatedProducts){
          let groupingObs: Observable<any>;
          let temp;
          relatedProd.qty = this.singleProduct.qty;
          let scope2b;
          groupingObs = this.productService.setGrouping(this.singleProduct.mtrl,relatedProd.grouping);

          groupingObs.subscribe(resData => {
            console.log(resData);
            this.scope3 = resData.Scope3;
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


        console.log("HANDLE GROUPING");
        console.log(this.tempGroup);
        console.log(product);
        for(let temp of this.tempGroup){
          if(temp.scope1.mtrl == product.mtrl){
            this.itemsToCart.push(temp.scope1)
            this.itemsToCart.push(temp.scope2)
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

      if(!btn.classList.contains('loading')) {
        btn.classList.add('loading');
        setTimeout(() => {
          
          for(let temp of this.tempGroup){
            if(temp.scope1.mtrl == product.mtrl){
              if(temp.scope1.diathesima <= 0 || temp.scope2.diathesima <= 0){
                  this.productService.sendBackOrderPopup(true);
                  
                  this.productService.backOrder.subscribe(resData => {
                    if(resData){
                      this.itemsToCart.push(temp.scope1)
                      this.itemsToCart.push(temp.scope2)
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
                  })
              }
              else{
                this.itemsToCart.push(temp.scope1)
                this.itemsToCart.push(temp.scope2)
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
            }
          }
          
          btn.classList.remove('loading');
        },2500)
      }
      
     
    }


    // if(+this.singleProduct.diathesima <= 0){
    //   this.itemsToCart = []
    //   btn.style.opacity = '1';
    //   this.btnLoading = true;
    //   if(!btn.classList.contains('loading')) {
    //     btn.classList.add('loading');
  
    //     setTimeout(() => {
  
  
    //       let groupingObs: Observable<any>;
  
    //   groupingObs = this.productService.setGrouping(this.singleProduct.mtrl,product.grouping);
  
    //   groupingObs.subscribe(resData => {
    //     console.log(resData);
  
    //     this.group = resData;
  
    //   });
    //   setTimeout(() => {
    //     console.log(this.group);
  
  
  
    //     if(this.group.Scope2.length > 0){
    //       if(this.group.Scope3.length <= 0){
    //         for(let i=0;i<this.group.Scope2.length;i++){
    //           this.group.Scope2[i].qty = this.singleProduct.qty;
    //         }
  
    //         this.singleProduct.show = true;
    //         // this.cartService.addToCart(this.singleProduct);
  
    //         this.cartService.sendProductAdded(true);
    //         this.itemsToCart.push(this.singleProduct);
  
    //         product.show = true;
  
  
    //         // this.cartService.addToCart(product);
  
    //         this.cartService.sendProductAdded(true);
    //         this.itemsToCart.push(product);
    //         for(let prod of this.group.Scope2){
    //           prod.show = true;
    //           // this.cartService.addToCart(prod);
  
    //           this.cartService.sendProductAdded(true);
    //           this.itemsToCart.push(prod);
    //         }
    //         this.cartService.setItemsToCartArray(this.itemsToCart);
  
    //       }
    //       else{
    //         for(let i=0;i<this.group.Scope2.length;i++){
    //           this.group.Scope2[i].qty = this.singleProduct.qty;
    //         }
  
    //         for(let i=0;i<this.group.Scope3.length;i++){
    //           this.group.Scope3[i].qty = this.singleProduct.qty;
    //         }
  
    //         this.itemsToCart.push(this.singleProduct);
    //         this.itemsToCart.push(product);
    //         console.log(product);
    //         for(let prod of this.group.Scope2){
    //           this.itemsToCart.push(prod);
    //         }
    //         console.log(this.itemsToCart);
  
    //         this.showScope3 = true;
    //       }
  
  
  
    //       this.productAdded = false;
    //       // window.location.reload();
    //     }
    //     else{
    //       if(this.group.Scope3.length <= 0){
    //         this.singleProduct.show = true;
    //         // this.cartService.addToCart(this.singleProduct);
  
    //         this.cartService.sendProductAdded(true);
    //         this.itemsToCart.push(this.singleProduct);
  
    //         product.show = true;
    //         // this.cartService.addToCart(product);
  
    //         this.cartService.sendProductAdded(true);
    //         this.itemsToCart.push(product);
    //         this.cartService.setItemsToCartArray(this.itemsToCart);
  
  
    //         window.location.reload();
    //       }
    //       else{
    //         for(let i=0;i<this.group.Scope3.length;i++){
    //           this.group.Scope3[i].qty = this.singleProduct.qty;
    //         }
  
    //         this.itemsToCart.push(this.singleProduct);
    //         this.itemsToCart.push(product);
    //         console.log(this.itemsToCart);
    //         this.showScope3 = true;
    //       }
  
  
  
    //       this.productAdded = false;
    //        window.location.reload();
    //     }
    //     this.btnLoading = false;
    //     btn.classList.remove('loading');
    //   },500)
    //     }, 1000);
    //   }
    // }
    // else{
    //   this.itemsToCart = []
    //   btn.style.opacity = '1';
    //   this.btnLoading = true;
    //   if(!btn.classList.contains('loading')) {
    //     btn.classList.add('loading');
  
    //     setTimeout(() => {
  
  
    //       let groupingObs: Observable<any>;
  
    //   groupingObs = this.productService.setGrouping(this.singleProduct.mtrl,product.grouping);
  
    //   groupingObs.subscribe(resData => {
    //     console.log(resData);
  
    //     this.group = resData;
  
    //   });
    //   setTimeout(() => {
    //     console.log(this.group);
  
  
  
    //     if(this.group.Scope2.length > 0){
    //       if(this.group.Scope3.length <= 0){
            
    //         for(let i=0;i<this.group.Scope2.length;i++){
    //           this.group.Scope2[i].qty = this.singleProduct.qty;
    //         }
  
    //         this.singleProduct.show = true;
    //         // this.cartService.addToCart(this.singleProduct);
  
    //         this.cartService.sendProductAdded(true);
    //         this.itemsToCart.push(this.singleProduct);
  
    //         product.show = true;
  
  
    //         // this.cartService.addToCart(product);
  
    //         this.cartService.sendProductAdded(true);
    //         this.itemsToCart.push(product);


    //         for(let prod of this.group.Scope2){
    //           if(+prod.diathesima > 0){

    //             prod.show = true;
    //             // this.cartService.addToCart(prod);
    
    //             this.cartService.sendProductAdded(true);
    //             this.itemsToCart.push(prod);
    //           }
    //           else{
    //             this.productService.sendBackOrderPopup(true);

    //             this.productService.backOrder.subscribe(resData => {
    //               if(resData){
    //                 prod.show = true;
    //                 // this.cartService.addToCart(prod);
        
    //                 this.cartService.sendProductAdded(true);
    //                 this.itemsToCart.push(prod);
    //               }
                  
    //             })
    //           }
    //         }
    //         this.cartService.setItemsToCartArray(this.itemsToCart);
  
    //       }
    //       else{
    //         for(let i=0;i<this.group.Scope2.length;i++){
    //           this.group.Scope2[i].qty = this.singleProduct.qty;
    //         }
  
    //         for(let i=0;i<this.group.Scope3.length;i++){
    //           this.group.Scope3[i].qty = this.singleProduct.qty;
    //         }
  
            

    //         this.productService.backOrder.subscribe(resData => {
    //           this.itemsToCart = [];
    //           if(resData && (this.itemsToCart.length > 1)){
    //             this.itemsToCart.push(this.singleProduct);
    //             this.itemsToCart.push(product);
    //             this.showScope3 = true;
    //             this.productAdded = false;
    //           } 
    //           else{
    //             this.itemsToCart = []
    //           }
    //           setTimeout(() => {
    //             console.log(this.itemsToCart);
    //           },50)
    //         })
    //         console.log(product);
    //         if(+product.diathesima > 0){
    //           this.itemsToCart = [];
    //           for(let prod of this.group.Scope2){
                
                
    //             if(+prod.diathesima > 0){
    //               console.log(this.group.Scope2);
                  
  
    //               prod.show = true;
    //               // this.cartService.addToCart(prod);
      
    //               // this.cartService.sendProductAdded(true);
    //               this.itemsToCart.push(prod);
    //               this.itemsToCart.push(this.singleProduct);
    //               this.itemsToCart.push(product);
    //               console.log(this.itemsToCart);
    //               this.showScope3 = true;
    //               this.productAdded = false;
                  
    //             }
    //             else{
    //               this.productService.sendBackOrderPopup(true);
  
    //               this.productService.backOrder.subscribe(resData => {
                    
    //                   if(resData){
                        
    //                     prod.show = true;
    //                     // this.cartService.addToCart(prod);
            
    //                     this.cartService.sendProductAdded(true);
    //                     this.itemsToCart.push(prod);
    //                   }
    //               })
    //             }
    //           }
    //         }
    //         else{
    //           this.productService.sendBackOrderPopup(true);
  
    //           this.productService.backOrder.subscribe(resData => {
    //             if(resData){
    //               for(let prod of this.group.Scope2){
    //                 if(+prod.diathesima > 0){
      
    //                   prod.show = true;
    //                   // this.cartService.addToCart(prod);
          
    //                   this.cartService.sendProductAdded(true);
    //                   this.itemsToCart.push(prod);
    //                   this.showScope3 = true;
    //                   this.productAdded = false;
      
    //                 }
    //                 else{
    //                   this.productService.sendBackOrderPopup(true);
      
    //                   this.productService.backOrder.subscribe(resData => {
    //                     if(resData){
    //                       prod.show = true;
    //                       // this.cartService.addToCart(prod);
              
    //                       this.cartService.sendProductAdded(true);
    //                       this.itemsToCart.push(prod);
    //                     }
    //                   })
    //                 }
    //               }
    //             }
    //           })
    //         }
            
  
            
    //       }
  
  
  
          
    //       // window.location.reload();
    //     }
    //     else{
    //       if(this.group.Scope3.length <= 0){
    //         this.singleProduct.show = true;
    //         // this.cartService.addToCart(this.singleProduct);
  
    //         this.cartService.sendProductAdded(true);
    //         this.itemsToCart.push(this.singleProduct);
  
    //         product.show = true;
    //         // this.cartService.addToCart(product);
  
    //         this.cartService.sendProductAdded(true);
    //         this.itemsToCart.push(product);
    //         this.cartService.setItemsToCartArray(this.itemsToCart);
  
  
    //         window.location.reload();
    //       }
    //       else{
    //         for(let i=0;i<this.group.Scope3.length;i++){
    //           this.group.Scope3[i].qty = this.singleProduct.qty;
    //         }
  
    //         this.itemsToCart.push(this.singleProduct);
    //         this.itemsToCart.push(product);
    //         console.log(this.itemsToCart);
    //         this.showScope3 = true;
    //       }
  
  
  
    //       this.productAdded = false;
    //        window.location.reload();
    //     }
    //     this.btnLoading = false;
    //     btn.classList.remove('loading');
    //   },500)
    //     }, 1000);
    //   }
    // }

   

  }

  hanldeScope3(product: any,btn?: any){
    if(+this.singleProduct.diathesima <= 0){
      btn.style.opacity = '1';
      this.btnLoading = true;
      if(!btn.classList.contains('loading')) {
        btn.classList.add('loading');
        setTimeout(() => { 
          this.itemsToCart.push(product);
          console.log(this.itemsToCart);
          
          
          this.addToCart();
          this.showScope3 = false;
          this.btnLoading = false;
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
            this.itemsToCart.push(product);
            console.log(this.itemsToCart);
            
            
            this.addToCart();
            this.showScope3 = false;
            this.btnLoading = false;
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
                this.itemsToCart.push(product);
                console.log(this.itemsToCart);
                
                
                this.addToCart();
                this.showScope3 = false;
                this.btnLoading = false;
                btn.classList.remove('loading');
              }, 1200);
            }
          }
        })

        
      }
    }
  }

  addToCart(){
   
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


      this.cartService.addToCart(prod);

      this.cartService.sendProductAdded(true);

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
    this.btnLoading = false;
      this.productService.sendBackOrder(true);
      this.backOrder = false;

  }

  stopBackOrder(){
    this.btnLoading = false;
      this.productService.sendBackOrder(false);
      this.backOrder = false;
  }


  continueBackOrder2(){
    this.btnLoading = false;
    this.productService.sendBackOrder2(true);
    this.backOrder2 = false;

  }

  stopBackOrder2(){
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
