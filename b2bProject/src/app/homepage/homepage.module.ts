import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './homepage.routes';
import { TranslateModule } from '@ngx-translate/core';
import { HomepageComponent } from './homepage.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CartComponent } from '../cart/cart.component';

@NgModule({
  declarations: [HomepageComponent, NavbarComponent,FooterComponent,CartComponent],
  imports: [CommonModule, RouterModule.forChild(HomeRoutes), TranslateModule],
})
export class HomepageModule {}
