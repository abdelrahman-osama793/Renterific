import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  email: any = localStorage.getItem('email');
  id: any = localStorage.getItem('id');
  street: any = localStorage.getItem('street');
  city: any = localStorage.getItem('city');
  phone: any = localStorage.getItem('phone');
  name: any = localStorage.getItem('name');

  
  constructor(
    private myuser: AuthService,
    private myrouter: Router,
    private _AuthService: AuthService
  ) {
  }

  ngOnInit(): void { }

  //Validation 
  EditProfileForm = new FormGroup({
    Name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]),
    Phone: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    Address_street: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(40)]),
    Address_city: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(12)])

  });

  editprofile(name: any, phone: any, email: any, street: any, city: any, password: any) {
    if (email === "" || password === "") {
      
      Swal.fire("not update user please insert email and password",'','error');
    } else {
      const salt = bcrypt.genSaltSync(10);
      const newpass = bcrypt.hashSync(password, salt);
      let data = {
        Name: name,
        Email: email,
        Password: newpass,
        Phone: phone,
        Address_street: street,
        Address_city: city,
      };
      this.myuser.updateUser(this.id, data).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );


      this._AuthService
        .sendPasswordChangeMail({
          email: email,
          password: password,
        })
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );


      this._AuthService.logout();
    }
  }

}
    
