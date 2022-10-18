import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import {  RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from "@angular/common/http";
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

import { InsertImagesComponent } from './AdminArea/components/insert-images/insert-images.component';
import { ContatcFormComponent } from './shared/contatc-form/contatc-form.component';
import { OfferPopupComponent } from './AdminArea/components/offer-popup/offer-popup.component';
import { FavoriteComponent } from './cart/favorite/favorite.component';
import { MosquiWizzardComponent } from './porducts/mosqui-wizzard/mosqui-wizzard.component';
import { UpdateColorsComponent } from './AdminArea/components/update-colors/update-colors.component';
import { UploadPdfComponent } from './AdminArea/components/upload-pdf/upload-pdf.component';
import { InsertPdfComponent } from './AdminArea/components/insert-pdf/insert-pdf.component';


import { ProductsCarouselComponent } from './porducts/products-carousel/products-carousel.component';
import { NextDirective } from './next.directive';
import { PrevDirective } from './prev.directive';
// @import '~ngx-owl-carousel-o/lib/styles/scss/owl.carousel';
// @import '~ngx-owl-carousel-o/lib/styles/scss/owl.theme.default';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';




import { AppRoutingModule } from './app-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TheCompanyComponent } from './the-company/the-company.component';
import { TeamComponent } from './team/team.component';

import { SwiperModule } from 'swiper/angular';
import { SafePipePipe } from './porducts/product-page/safe-pipe.pipe';
import { PdfComponent } from './AdminArea/pdf-component/pdf-component.component';
import { ImageComponent } from './AdminArea/image/image.component';
import { CheckoutNavComponent } from './checkout-nav/checkout-nav.component';
import { OrderCompletedComponent } from './order-completed/order-completed.component';










export function rootLoaderactory(http:any){
  console.log(new TranslateHttpLoader(http,'assets/i18n.','.json'));

  return new TranslateHttpLoader(http,'assets/i18n/','.json')
}

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

    ProfileComponent,
    InsertImagesComponent,
    ContatcFormComponent,
    OfferPopupComponent,
    FavoriteComponent,
    MosquiWizzardComponent,
    UpdateColorsComponent,

    UploadPdfComponent,
    InsertPdfComponent,

    ProductsCarouselComponent,
    NextDirective,
    PrevDirective,
    SafePipePipe,

    TheCompanyComponent,
    TeamComponent,
    PdfComponent,
    ImageComponent,
    CheckoutNavComponent,
    OrderCompletedComponent


  ],
  imports: [
    BrowserModule,
     RouterModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,

    SwiperModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:rootLoaderactory,
        deps:[HttpClient]
      }
    }),






    SwiperModule

  ],
  exports: [
    RouterModule
  ]
  ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

