import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient:HttpClient) {
  }
  AllProduct(){
    return this.httpclient.get('http://localhost:3333/api/product/all-product');
  }
  UpdateProduct(id:any,data:any){
    return this.httpclient.put(`http://localhost:3333/api/product/update-product/${id}`,data);
  }
  DeleteProduct(id:any){
    return this.httpclient.delete(`http://localhost:3333/api/product/delete-product/${id}`);
  }
  getCategoryFproduct(){
    return this.httpclient.get('http://localhost:3333/api/product/get-category-from-productcollection');
  }
  getUserFproduct(){
    return this.httpclient.get('http://localhost:3333/api/product/get-user-from-productcollection');
  }
  SearchBCategoryTitle(title:string){
    return this.httpclient.get(`http://localhost:3333/api/product/search-by-category-title/${title}`);
  }
  SearchBUserEmail(email:any){
    return this.httpclient.get(`http://localhost:3333/api/product/search-by-user-email/${email}`);
  }
  getProduct(id:any){
    return this.httpclient.get(`http://localhost:3333/api/product/get-product/${id}`)
  }
  AddProduct(data:FormData,categoryTitle:string,userEmail:string){
    console.log([data,categoryTitle,userEmail])
    let config = {headers: {cattitle:categoryTitle,useremail:userEmail} }
    return this.httpclient.post(`http://localhost:3333/api/product/add-product`,data,config)
  }
}
