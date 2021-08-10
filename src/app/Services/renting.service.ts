import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentingService {

  constructor(private myhttpclient:HttpClient) {
   }
   AddRenting(data:any){
     return this.myhttpclient.post('http://localhost:3333/api/renting-operation/add-renting',data);
   }
   GetAllRental(){
     return this.myhttpclient.get('http://localhost:3333/api/renting-operation/all-renting');
   }
   PaymentOperation(data:any){
    return this.myhttpclient.post('http://localhost:3333/payment',data);
   }
}
