import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  email:any= localStorage.getItem('email');
  street:any= localStorage.getItem('street');
  city:any= localStorage.getItem('city');
  phone:any= localStorage.getItem('phone');
  name:any= localStorage.getItem('name');
  img:any= localStorage.getItem('img');
  constructor() { }

  ngOnInit(): void {
  }
  editProfile(){
    
  }
}
