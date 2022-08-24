import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { AdminAreaComponent } from './AdminArea/admin-area/admin-area.component';
import { AdminNavComponent } from './AdminArea/admin-nav/admin-nav.component';
import { AdminareausersComponent } from './AdminArea/adminareausers/adminareausers.component';
import { AdminareaproductsComponent } from './AdminArea/adminareaproducts/adminareaproducts.component';
import { PorductsComponent } from './porducts/porducts.component';
import { SingleProductComponent } from './porducts/single-product/single-product.component';
import { ProductPageComponent } from './porducts/product-page/product-page.component';
import { ProductListComponent } from './porducts/product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ProductAddedToCartComponent } from './shared/product-added-to-cart/product-added-to-cart.component';
import { CheckoutGuard } from './shared/product-added-to-cart/checkout.guard';
import { ProfileComponent } from './profile/profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { UpdateUsersComponent } from './AdminArea/components/update-users/update-users.component';
import { InsertUsersComponent } from './AdminArea/components/insert-users/insert-users.component';
import { UpdateProductsComponent } from './AdminArea/components/update-products/update-products.component';
import { InsertProductsComponent } from './AdminArea/components/insert-products/insert-products.component';
import { PopUpLoginComponent } from './AdminArea/components/pop-up-login/pop-up-login.component';
import { SpinnerComponent } from './spinner/spinner.component';



const routes:Routes = [

  {
    path:'',
    redirectTo : 'log-in',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    component: LogInComponent
  },

  {
    path:'edit-products',
    canActivate: [AuthGuard],
    component:AdminareaproductsComponent
  },
  {
    path:'users',
    canActivate: [AuthGuard],
    component:AdminareausersComponent
  },
  {
    path:'products',
    component:PorductsComponent,
    canActivate: [AuthGuard],
    children: [
      {path: ':cat_id/:subcat_id', component: ProductListComponent, pathMatch: 'full'},
      {path: 'product-page', component: ProductPageComponent}
    ]
  },
  {
    path:'dashboard',
    canActivate: [AuthGuard],
    component:AdminAreaComponent,
    children:[
      {
        path:'update-users',
        component: UpdateUsersComponent
      },
      {
        path:'insert-users',
        component: InsertUsersComponent
      },
      {
        path:'update-products',
        component: UpdateProductsComponent
      },
      {
        path: 'insert-products',
        component: InsertProductsComponent
      }

    ]
  },

  {
    path: 'cart',
    canActivate: [AuthGuard],
    component: CartComponent
  },
  {
    path: 'checkout',
    canActivate: [CheckoutGuard],
    component: CheckoutPageComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: 'my-orders',
    canActivate: [AuthGuard],
    component: MyOrdersComponent
  },

]


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,

    NavbarComponent,
    AdminAreaComponent,
    AdminNavComponent,
    AdminareausersComponent,
    AdminareaproductsComponent,
    PorductsComponent,
    SingleProductComponent,
    ProductPageComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    CheckoutPageComponent,
    ProductAddedToCartComponent,
    UpdateUsersComponent,
    InsertUsersComponent,
    UpdateProductsComponent,
    InsertProductsComponent,
    PopUpLoginComponent,
    SpinnerComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
  ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
