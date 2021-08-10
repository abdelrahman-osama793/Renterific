import { Component, OnInit } from '@angular/core';
import  {AuthService} from '../../../Services/auth.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogin:boolean=false
  constructor(private _AuthService:AuthService) { 
   _AuthService.currentUser.subscribe(()=>{
     console.log(_AuthService.currentUser.getValue())
     if(_AuthService.currentUser.getValue() !=null){
       this.isLogin=true
     }else{
       this.isLogin=false
     }
   })
  }

  ngOnInit(): void {
  }



  isLogOut(){
    this._AuthService.logout();
  }

}
