import { Component, OnInit } from '@angular/core';
import  {AuthService} from '../../Services/auth.service'
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  error:string ='';
  constructor(private _AuthService:AuthService,private _Router:Router) { }

  registerForm = new FormGroup({
      Name:new FormControl(null,[Validators.required,Validators.minLength(5), Validators.maxLength(20)]),
      Email:new FormControl(null,[Validators.required,Validators.email]),
      Password:new FormControl(null,[Validators.required ,Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]),
      Phone:new FormControl(null,[Validators.required ,Validators.pattern('^[0-9]{11}$')]),
      Address_street:new FormControl(null,[Validators.required,Validators.minLength(10), Validators.maxLength(40)]),
      Address_city:new FormControl(null,[Validators.required,Validators.minLength(3), Validators.maxLength(12)])

    });
submitRegisterForm(registerForm:FormGroup){
    console.log(registerForm.value)
    this._AuthService.register(registerForm.value).subscribe((response)=>{
      console.log(response.message);
      

if(response.status == "data is registered")

{
  this._Router.navigate(['/sign-in' ])
}
else{
  this.error=response.errors.email.message
}
  })

}

  ngOnInit(): void {
  }


}
