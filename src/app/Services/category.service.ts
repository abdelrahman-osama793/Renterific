import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) {    
   }
   
   getAllCategory():Observable<any>{
    return this._HttpClient.get('http://localhost:3333/api/category/all-category')
  }
  addNewCategory(formData:any):Observable<any>
  {
   return this._HttpClient.post('http://localhost:3333/api/category/add-category',formData);
  }
  searchByCategoryTitle(title:string):Observable<any>
  {
   return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${title}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
  }

}

