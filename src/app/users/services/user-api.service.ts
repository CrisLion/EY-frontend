import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private baseUrl: string = "https://localhost:44378/api/v1/users";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post(`${this.baseUrl}/register`, user, this.httpOptions);
  }

  loginUser(user: User) {
    return this.http.post(`${this.baseUrl}/login`, user, this.httpOptions);
  }
}
