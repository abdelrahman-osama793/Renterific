import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {
  name:any= localStorage.getItem('name');
  constructor(private myProductService:ProductService, private router: Router) { 
    this.getProductOfUser()
  }
  product:any;
  ngOnInit(): void {
    // this.getProductOfUser()
  }
  getProductOfUser(){
    this.myProductService.SearchBUserEmail(localStorage.getItem('email')).subscribe(
      (res:any)=>{this.product=res
      console.log(res)
      },
      (err)=>{console.log(err)},
    );
  }
 async DeleteProduct(id:any){
  let data =  await this.myProductService.DeleteProduct(id).subscribe(

    (res:any)=>{
      console.log(res);
      this.getProductOfUser()

    },
    (err)=>{console.log(err)},
    
  );


  // this.router.navigateByUrl('/profile/profile/addNewProduct')
}
}
