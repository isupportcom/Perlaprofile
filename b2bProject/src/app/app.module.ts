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

import { InsertProductsComponent } from './AdminArea/components/insert-products/insert-products.component';
import { PopUpLoginComponent } from './AdminArea/components/pop-up-login/pop-up-login.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { InsertCategoriesComponent } from './AdminArea/components/insert-categories/insert-categories.component';
import { UpdateCategoriesComponent } from './AdminArea/components/update-categories/update-categories.component';

import { UploadImageComponent } from './AdminArea/components/upload-image/upload-image.component';

import { AllimagesComponent } from './AdminArea/components/allimages/allimages.component';

import { HomepageComponent } from './homepage/homepage.component';
import { AddImagePopupComponent } from './AdminArea/components/add-image-popup/add-image-popup.component';
import {AdminGuard} from "./services/admin.guard";


import { FooterComponent } from './footer/footer.component';
import { SearchbarComponent } from './AdminArea/components/searchbar/searchbar.component';
import { OffersComponent } from './AdminArea/components/offers/offers.component';
import { InsertImagesComponent } from './AdminArea/components/insert-images/insert-images.component';
import { ContatcFormComponent } from './shared/contatc-form/contatc-form.component';
import { OfferPopupComponent } from './AdminArea/components/offer-popup/offer-popup.component';
import { FavoriteComponent } from './cart/favorite/favorite.component';
import { MosquiWizzardComponent } from './porducts/mosqui-wizzard/mosqui-wizzard.component';
import { UpdateColorsComponent } from './AdminArea/components/update-colors/update-colors.component';








const routes:Routes = [

  {
    path:'',
    redirectTo : 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomepageComponent
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
    children: [
      {path: ':cat_id/:cat_name', component: ProductListComponent, pathMatch: 'full'},
      {path: 'product-page', component: ProductPageComponent},
      {path: 'mosqui/:sub_id/:sub_name',component:MosquiWizzardComponent}
    ]
  },
  {
    path:'dashboard',
    canActivate:[AdminGuard],
    component:AdminAreaComponent,
    children:[


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
    path:'favorites',
    component:FavoriteComponent,
    canActivate:[AuthGuard]
  },

  {
    path: 'checkout',

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


  {
    path:'contact',
    component:ContatcFormComponent
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
    MyOrdersComponent,
    InsertProductsComponent,
    PopUpLoginComponent,
    SpinnerComponent,
    InsertCategoriesComponent,
    UpdateCategoriesComponent,
    UploadImageComponent,
    AllimagesComponent,
    HomepageComponent,
    AddImagePopupComponent,
    FooterComponent,
    SearchbarComponent,
    OffersComponent,
    ProfileComponent,
    InsertImagesComponent,
    ContatcFormComponent,
    OfferPopupComponent,
    FavoriteComponent,
    MosquiWizzardComponent,
    UpdateColorsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,

  ],
  exports: [
    RouterModule
  ]
  ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
