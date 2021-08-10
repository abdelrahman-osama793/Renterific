import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {
  category:any;
  formData: FormData = new FormData();
  constructor(private myservice:CategoryService,private myproductservice:ProductService,private router: Router) { }

  ngOnInit(): void {
    this.getCategory(); 
  }
  async getCategory(){
    return await this.myservice.getAllCategory().subscribe(
      (res)=>{
        this.category=res},
      (err)=>{console.log(err)},
    )
  }
  //validation
  addProductForm = new FormGroup({
    Name:new FormControl(null,[Validators.required,Validators.minLength(5), Validators.maxLength(20)]),
    Desc:new FormControl(null,[Validators.required,Validators.minLength(10), Validators.maxLength(70)]),
    Address_street:new FormControl(null,[Validators.required,Validators.minLength(10), Validators.maxLength(40)]),
    Img:new FormControl(null,[Validators.required])
  });


  // add product
  async AddProduct(title:any,desc:any,price:any,cat_title:any,files:any){
    let emailuser:any = localStorage.getItem('email');//by useing session
    this.formData.append('photo',files[0]); 
    this.formData.append('title',title); 
    this.formData.append('image',files[0].name); 
    this.formData.append('desc',desc); 
    this.formData.append('price_by_day',price); 
    Swal.fire({
      title: 'Are you sure want to Added new Product?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, added it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let data = this.myproductservice.AddProduct(this.formData,cat_title,emailuser).subscribe((res)=>{console.log(res)},(err)=>{console.log(err)})
        Swal.fire(
          'Added!',
          'Your imaginary file has been Added.',
          'success'
        )
        window.location.href= '/profile/profile/myProducts';
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    // this.router.navigateByUrl('/profile/profile/myProducts')

  }

}
