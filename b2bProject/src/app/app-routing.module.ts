import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { AdminAreaComponent } from "./AdminArea/admin-area/admin-area.component";
import { AdminareaproductsComponent } from "./AdminArea/adminareaproducts/adminareaproducts.component";
import { AdminareausersComponent } from "./AdminArea/adminareausers/adminareausers.component";
import { InsertProductsComponent } from "./AdminArea/components/insert-products/insert-products.component";
import { CartComponent } from "./cart/cart.component";
import { FavoriteComponent } from "./cart/favorite/favorite.component";
import { CheckoutPageComponent } from "./checkout-page/checkout-page.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { LogInComponent } from "./log-in/log-in.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
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
  }

];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
