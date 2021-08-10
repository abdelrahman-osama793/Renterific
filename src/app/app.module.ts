import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { HeaderComponent } from './Components/Layout/header/header.component';
import { FooterComponent } from './Components/Layout/footer/footer.component';
import { BannerComponent } from './Components/landing-page/banner/banner.component';
import { SlideShowComponent } from './Components/landing-page/slide-show/slide-show.component';
import { ContactUsComponent } from './Components/landing-page/contact-us/contact-us.component';
import { OurClientsReviewsComponent } from './Components/landing-page/our-clients-reviews/our-clients-reviews.component';
import { OurServicesComponent } from './Components/landing-page/our-services/our-services.component';
import { AboutUsComponent } from './Components/landing-page/about-us/about-us.component';
import { OurTeamComponent } from './Components/landing-page/our-team/our-team.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { ExploreProductsComponent } from './Components/explore-products/explore-products.component';
import { RentalComponent } from './Components/rent-operation/rental/rental.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { StripeModule } from "stripe-angular";


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    SlideShowComponent,
    ContactUsComponent,
    OurClientsReviewsComponent,
    OurServicesComponent,
    AboutUsComponent,
    OurTeamComponent,
    SignInComponent,
    SignUpComponent,
    ExploreProductsComponent,
    RentalComponent,
    PaymentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,ReactiveFormsModule, HttpClientModule,FormsModule,StripeModule.forRoot("pk_test_51JEgToCAlmE8w7N1BhcxIjbQkLH7qOx1sk5GZpzbB6QzQLtMBCDdZcP2JlQzRCgpeOW8Kk0jNkyjEKmVyx21QOYE00uYP8trKO") ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
