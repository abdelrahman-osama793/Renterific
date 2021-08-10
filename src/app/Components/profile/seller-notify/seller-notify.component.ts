import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ProductService } from 'src/app/Services/product.service';
import { RentingService } from 'src/app/Services/renting.service';

@Component({
  selector: 'app-seller-notify',
  templateUrl: './seller-notify.component.html',
  styleUrls: ['./seller-notify.component.scss']
})
export class SellerNotifyComponent implements OnInit {
  rental_seller:any;
  product:any;
  SellerDetails:any;
  constructor(private myrental:RentingService,private myproduct:ProductService,private myserviceuser:AuthService) { }

  ngOnInit(): void {
    this.getallrental();
  }
  async getallrental(){
    let x:any;
    await this.myrental.GetAllRental().subscribe(res=>{
      x = res;
     this.rental_seller = [];
      for (const rent of x) {
          if(rent.seller==localStorage.getItem('id')){
            this.myproduct.getProduct(rent.product).subscribe(async res=>{
              this.product=res;
              await this.myserviceuser.getUserById(rent.seller).subscribe(userOne=>{
                this.SellerDetails = userOne
              },err=>{console.log(err)})
            },err=>{console.log(err)})
            this.rental_seller.push(rent);
          }
      }
    },err=>{console.log(err)})
  }

}
