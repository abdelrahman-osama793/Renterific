import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsPageComponent } from './Components/User/Products/products-page/products-page.component';
import { ProfileComponent } from './Components/User/Profile/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsPageComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
