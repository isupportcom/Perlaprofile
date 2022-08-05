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
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProfileComponent } from './profile/profile.component';

const routes:Routes = [

  {
    path:'',
    component:LogInComponent
  },

  {
    path:'dashboard',
    component:AdminAreaComponent
  },
  {
    path:'edit-products',
    component:AdminareaproductsComponent
  },
  {
    path:'users',
    component:AdminareausersComponent
  },
  {
    path:'products',
    component:PorductsComponent,
    children: [
      {path: '', component: ProductListComponent, pathMatch: 'full'},
      {path: 'product-page', component: ProductPageComponent}
    ]
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }

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
    MyOrdersComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
  ],
  exports: [
    RouterModule
  ]
  ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
