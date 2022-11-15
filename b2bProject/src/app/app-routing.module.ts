import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { AdminAreaComponent } from "./AdminArea/admin-area/admin-area.component";
import { AdminareaproductsComponent } from "./AdminArea/adminareaproducts/adminareaproducts.component";
import { AdminareausersComponent } from "./AdminArea/adminareausers/adminareausers.component";
import { CatalogsComponent } from "./AdminArea/catalogs/catalogs.component";
import { DeleteCatalogsComponent } from "./AdminArea/components/delete-catalogs/delete-catalogs.component";
import { InsertImagesComponent } from "./AdminArea/components/insert-images/insert-images.component";
import { InsertPdfComponent } from "./AdminArea/components/insert-pdf/insert-pdf.component";
import { InsertProductsComponent } from "./AdminArea/components/insert-products/insert-products.component";
import { UpdateCategoriesComponent } from "./AdminArea/components/update-categories/update-categories.component";
import { UpdateColorsComponent } from "./AdminArea/components/update-colors/update-colors.component";
import { UpdateRelatedComponent } from "./AdminArea/components/update-related/update-related.component";
import { UploadCatalogsComponent } from "./AdminArea/components/upload-catalogs/upload-catalogs.component";
import { UploadImageComponent } from "./AdminArea/components/upload-image/upload-image.component";
import { UploadPdfComponent } from "./AdminArea/components/upload-pdf/upload-pdf.component";
import { ImageComponent } from "./AdminArea/image/image.component";
import { PdfComponent } from "./AdminArea/pdf-component/pdf-component.component";
import { CartComponent } from "./cart/cart.component";
import { FavoriteComponent } from "./cart/favorite/favorite.component";
import { CatalogsFrontComponent } from "./catalogs-front/catalogs-front.component";
import { CheckoutPageComponent } from "./checkout-page/checkout-page.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { LogInComponent } from "./log-in/log-in.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { OrderCompletedComponent } from "./order-completed/order-completed.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { MosquiWizzardComponent } from "./porducts/mosqui-wizzard/mosqui-wizzard.component";
import { PorductsComponent } from "./porducts/porducts.component";
import { ProductListComponent } from "./porducts/product-list/product-list.component";
import { ProductPageComponent } from "./porducts/product-page/product-page.component";
import { ProfileComponent } from "./profile/profile.component";
import { AdminGuard } from "./services/admin.guard";
import { AuthGuard } from "./services/auth.guard";
import { ContatcFormComponent } from "./shared/contatc-form/contatc-form.component";
import { TeamComponent } from "./team/team.component";
import { TheCompanyComponent } from "./the-company/the-company.component";

const routes :Routes =[
  {
    path:'',
    pathMatch:'full',
    redirectTo:'home'
  }, {
    path: 'log-in',
    component: LogInComponent
  },
  {
    path:'home',
    component:HomepageComponent
  },
  {
    path:'edit-products',
    canActivate: [AuthGuard],
    component:AdminareaproductsComponent
  },
  {
    path:'catalogs',
    canActivate: [AuthGuard],
    component: CatalogsFrontComponent
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
      {path: 'product-page', component: ProductPageComponent,children: [
        {
          path: '**',
          component: ProductPageComponent
        }
      ]},
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
      },
      {
        path: 'update-related',
        component: UpdateRelatedComponent
      },
      {
        path: 'update-categories',
        component: UpdateCategoriesComponent
      },
      {
        path: 'update-colors',
        component: UpdateColorsComponent
      },
      {
        path: 'pdf',
        component: PdfComponent,
        children:[
          {
            path: 'upload',
            component: UploadPdfComponent
          },
          {
            path: 'insert',
            component: InsertPdfComponent
          }
        ]
      },
      {
        path: 'image',
        component: ImageComponent,
        children: [
          {
            path: 'upload',
            component: UploadImageComponent
          },
          {
            path: 'insert',
            component: InsertImagesComponent
          }
        ]
      },
      {
        path: 'catalogs',
        component: CatalogsComponent,
        children: [
          {
            path: 'upload',
            component: UploadCatalogsComponent
          },
          {
            path: 'delete',
            component: DeleteCatalogsComponent
          }
        ]
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
    canActivate:[AuthGuard],
    component: CheckoutPageComponent
  },
  {
    path: 'order-completed',
    canActivate:[AuthGuard],
    component: OrderCompletedComponent
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
  {
    path:'contact',
    component:ContatcFormComponent
  },
  {
    path: 'company',
    component: TheCompanyComponent
  },
  {
    path: 'the-team',
    component: TeamComponent
  },
{
  path:'**',
  redirectTo:'404'
},
{
  path:'404',
  component:PageNotFoundComponent
}



];
@NgModule({
  imports:[RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports:[RouterModule]
})

export class AppRoutingModule{}
