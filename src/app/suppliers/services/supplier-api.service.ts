import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../model/supplier';
import { SupplierCreation } from '../model/supplier-creation';

@Injectable({
  providedIn: 'root'
})
export class SupplierApiService {

  private baseUrl: string = "https://localhost:44378/api/v1/suppliers";

  constructor(private http: HttpClient) { }

  getSuppliersByUserId(userId: number){
    const token = localStorage.getItem('token')
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<Supplier[]>(`${this.baseUrl}/filter/?userId=${userId}`, { headers });
  }

  getSupplierById(supplierId: number){
    const token = localStorage.getItem('token')
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<Supplier>(`${this.baseUrl}/${supplierId}`, { headers });
  }

  postSupplier(supplier: SupplierCreation){
    const token = localStorage.getItem('token')
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.post<Supplier>(this.baseUrl, supplier, { headers });
  }

  putSupplier(id: number, supplier: Supplier) {
    const token = localStorage.getItem('token')
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.put<Supplier>(`${this.baseUrl}/${id}`, supplier, { headers });
  }

  deleteSupplierById(id: number) {
    const token = localStorage.getItem('token')
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.delete<Supplier>(`${this.baseUrl}/${id}`, { headers });
  }

}
