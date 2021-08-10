import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { RentingService } from 'src/app/Services/renting.service';

@Component({
  selector: 'app-buyer-notify',
  templateUrl: './buyer-notify.component.html',
  styleUrls: ['./buyer-notify.component.scss']
})
export class BuyerNotifyComponent implements OnInit {
  rental_buyer:any;
  product:any;
  constructor(private myrental:RentingService,private myproduct:ProductService) { }

  ngOnInit(): void {
    this.getallrental();
  }
  async getallrental(){
    let x:any;
    await this.myrental.GetAllRental().subscribe(res=>{
      x = res;
     this.rental_buyer = [];
      for (const rent of x) {
          if(rent.buyer==localStorage.getItem('id')){
            this.myproduct.getProduct(rent.product).subscribe(res=>{
              this.product=res;
            },err=>{console.log(err)})
            this.rental_buyer.push(rent);
          }
      }
    },err=>{console.log(err)})
  }

}
