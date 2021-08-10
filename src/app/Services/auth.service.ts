import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') != null) {
      this.saveCurrentUser();
    }
  }

  saveCurrentUser() {
    let token: any = localStorage.getItem('userToken');
    this.currentUser.next(jwtDecode(token));
    console.log(this.currentUser);
  }

  login(formData: any): Observable<any> {
    return this._HttpClient.post(
      'http://localhost:3333/api/user/login',
      formData
    );
  }
  register(formData: any): Observable<any> {
    return this._HttpClient.post(
      'http://localhost:3333/api/user/add-user',
      formData
    );
  }
  logout() {
    this.currentUser.next(null);
    localStorage.clear();
    this._Router.navigate(['./sign-in']);
  }
  updateUser(id: any, data: any) {
    return this._HttpClient.put(
      `http://localhost:3333/api/user/update-user/${id}`,
      data
    );
  }

  sendPasswordChangeMail(data: any) {
    return this._HttpClient.post(`http://localhost:3333/sendMail`, data);
  }
  deleteUser(id: any) {
    return this._HttpClient.delete(
      `http://localhost:3333/api/user/delete-user/${id}`
    );
  }
  getUserById(id: any) {
    return this._HttpClient.get(`http://localhost:3333/api/user/get-user/${id}`);
  }
}
