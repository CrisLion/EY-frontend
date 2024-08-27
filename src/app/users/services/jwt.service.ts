import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  
  constructor() { }

  getDecodedToken(): any {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getUserIdFromToken(): any {
    const decodedToken = this.getDecodedToken();
    if (decodedToken) {
      return decodedToken.sid || null; // Cambia 'userId' por el nombre del claim que contiene el ID del usuario
    }
    return null;
  }

}
