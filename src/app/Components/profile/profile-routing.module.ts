import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { BuyerNotifyComponent } from './buyer-notify/buyer-notify.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { MyNotificationComponent } from './my-notification/my-notification.component';
import { MyProductsComponent} from './my-products/my-products.component';
import { SellerNotifyComponent } from './seller-notify/seller-notify.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  {
    path: 'profile',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: MyProductsComponent,
      },

      {
        path: 'myProducts',
        component: MyProductsComponent,
      },
      {
        path: 'myProducts/editProduct/:id',
        component: EditProductComponent,
      },
      {
        path: 'addNewProduct',
        component: AddNewProductComponent,
      },
      {
        path: 'notification',
        component: MyNotificationComponent,
      },
      {
        path: 'seller-notify',
        component: SellerNotifyComponent,
      },
      {
        path: 'buyer-notify',
        component: BuyerNotifyComponent,
      },
      {
        path: 'editProfile',
        component: EditProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
