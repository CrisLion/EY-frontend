import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorldBankResponse } from '../model/world-bank-response';

@Injectable({
  providedIn: 'root'
})
export class ScreeningApiService {

  private baseUrl: string = "http://127.0.0.1:8000/api/v1/worldbank";

  constructor(private http: HttpClient) { }

  getScreeningBySupplierCompanyName(supplierCompanyName: string){
    return this.http.get<WorldBankResponse>(`${this.baseUrl}/search/?input=${supplierCompanyName}`)
  }
}
