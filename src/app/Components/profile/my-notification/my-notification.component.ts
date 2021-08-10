import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { RentingService } from 'src/app/Services/renting.service';

@Component({
  selector: 'app-my-notification',
  templateUrl: './my-notification.component.html',
  styleUrls: ['./my-notification.component.scss']
})
export class MyNotificationComponent implements OnInit {
  rental_buyer:any;
  rental_seller:any;
  flag:string="seller"
  product:any;
  constructor(private myrental:RentingService,private myproduct:ProductService) { }

  ngOnInit(): void {
    this.getallrental();
  }
  async getallrental(){
    let x:any;
    await this.myrental.GetAllRental().subscribe(res=>{
      x = res;
     this.rental_seller = [];
     this.rental_buyer = [];
      console.log(x);
      for (const rent of x) {
          if(rent.seller==localStorage.getItem('id')){
            this.myproduct.getProduct(rent.product).subscribe(res=>{
              this.product=res;
            },err=>{console.log(err)})
            this.rental_seller.push(rent);
            this.flag = "seller";
          }else if(rent.buyer==localStorage.getItem('id')){
            this.myproduct.getProduct(rent.product).subscribe(res=>{
              this.product=res;
            },err=>{console.log(err)})
            this.rental_buyer.push(rent);
            this.flag = "buyer";
          }else{
            console.log('roopot')
          }
      }
    },err=>{console.log(err)})
  }

}
