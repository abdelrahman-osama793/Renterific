import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentingService } from 'src/app/Services/renting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
price:any;
email:any = localStorage.getItem('email')
  constructor(private myactivated:ActivatedRoute,private mypayment:RentingService,private router:Router) { 
    this.price = this.myactivated.snapshot.params.price;
  }
  buy(c_number:any,exp_number:any,exp_year:any,cvc:any){
    let data = {
      "c_number":c_number,
      "exp_number":exp_number,
      "exp_year":exp_year,
      "cvc":cvc,
      "email":this.email,
      "price":this.price
    }
    Swal.fire({
      title: 'Are you sure want to Pay?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Pay it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.mypayment.PaymentOperation(data).subscribe((res)=>{
        console.log(res)  
        },(err)=>{console.log(err)})
        Swal.fire(
          'paid!',
          'Your imaginary file has been Payed.',
          'success'
        )
        this.router.navigateByUrl('/home')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }


  ngOnInit(): void {
  }

}
