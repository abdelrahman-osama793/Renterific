import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { RentingService } from 'src/app/Services/renting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss']
})
export class RentalComponent implements OnInit {
product:any;
total_payment:any;
num_days:number=0;
price_day:number=0;
buyer_id:any=localStorage.getItem('id');
operation:number=0;
  constructor(private mynavigate:Router,private myroute:ActivatedRoute,private myproduct:ProductService,private myrenting:RentingService) {
    
   }

  ngOnInit(): void {
    this.getProduct(this.myroute.snapshot.params.id);
    this.operation = this.price_day * this.num_days;
  }
  async getProduct(id:any){
    return this.myproduct.getProduct(id).subscribe(
      (res)=>{this.product=res
        this.price_day =this.product.price_by_day},
      (err)=>{console.log(err)}
    )
  }


  async rentalFun(pro_title:any,pro_desc:any,price_by_day:any,start_data:any,numberOfDay:any,postionOfReceiving:any,seller_id:any,buyer_data:any,oper_Total_Payment:any,product_id:any){
    let data = {
      "total_payment":oper_Total_Payment,
      "total_days":numberOfDay,
      "start_date":start_data,
      "position_receipt":postionOfReceiving,
      "status_operation":"shipping",
      "seller":seller_id,
      "buyer":buyer_data,
      "product":product_id
    }
    //


    Swal.fire({
      title: 'Are you sure want to Rented?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Rented it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
         this.myproduct.UpdateProduct(product_id,{"status":"unavailable"}).subscribe(res=>{console.log(res)},err=>{console.log(err)})
         this.myrenting.AddRenting(data).subscribe(res=>{console.log(res)},err=>{console.log(err)})
        Swal.fire(
          'Rented!',
          'Your imaginary file has been Rented.',
          'success'
        )
        this.mynavigate.navigateByUrl(`/payment/${oper_Total_Payment}`);
        
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }



  }
