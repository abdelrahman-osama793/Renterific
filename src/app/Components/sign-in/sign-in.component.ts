import { Component, OnInit } from '@angular/core';
import  {AuthService} from '../../Services/auth.service'
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private _AuthService : AuthService,private _Router:Router) { }
  error:string ='';
// validation 
  loginForm=new FormGroup({ 
    Email:new FormControl(null,[Validators.required,Validators.email]),
    Password:new FormControl(null,[Validators.required]),
  
   })

// method for log in
  submitLoginForm(loginForm:FormGroup){
    this._AuthService.login(loginForm.value).subscribe((response)=>{
      if(response.message == "success"){
        localStorage.setItem('email',response.data.Email)
        localStorage.setItem('id',response.data._id)
        localStorage.setItem('password',response.data.Password)
        localStorage.setItem('phone',response.data.Phone)
        localStorage.setItem('name',response.data.Name)
        localStorage.setItem('street',response.data.Address_street)
        localStorage.setItem('city',response.data.Address_city)
        localStorage.setItem('Role_name',response.data.Role_name)
        localStorage.setItem('userToken',response.token);
        console.log(response);



        Swal.fire({
          title: 'Are you sure Sure Of Login Data?',
          text: 'You will not be able to recover this file!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Login it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            this._AuthService.saveCurrentUser();
            Swal.fire(
              'Logined!',
              'Your imaginary file has been Logined.',
              'success'
            )
            this._Router.navigate(['/home' ])
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            )
          }
        })
  

        
        
  
      }
      else{
        this.error=response.message
      }
    })
   }

  ngOnInit(): void {
  }

}
