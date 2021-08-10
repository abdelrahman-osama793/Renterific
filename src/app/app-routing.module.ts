import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreProductsComponent } from './Components/explore-products/explore-products.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';

import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';
import { RentalComponent } from './Components/rent-operation/rental/rental.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { PaymentComponent } from './Components/payment/payment.component';


const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'home',canActivate:[AuthGuard], component: LandingPageComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'rental/:id', component: RentalComponent },
  { path: 'payment/:price', component: PaymentComponent },
  { path: 'explore-products',canActivate:[AuthGuard], component: ExploreProductsComponent },

  {
    path: 'profile',
    loadChildren: () =>
      import('../app/Components/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
