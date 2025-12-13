import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '../utility/apiConfig';

export interface SaleInvoiceFilters {
  year?: number;
  month?: number;
  date?: number;
  payment_status?: number;
  client_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SaleInvoiceService {

  constructor(private http: HttpClient) { }

  getSaleInvoices(filters: SaleInvoiceFilters = {}): Observable<any> {
    let params = new HttpParams();

    if (filters.year) {
      params = params.set('year', filters.year.toString());
    }
    if (filters.month) {
      params = params.set('month', filters.month.toString());
    }
    if (filters.date) {
      params = params.set('date', filters.date.toString());
    }
    if (filters.payment_status !== undefined && filters.payment_status !== null) {
      params = params.set('payment_status', filters.payment_status.toString());
    }
    if (filters.client_id) {
      params = params.set('client_id', filters.client_id.toString());
    }

    return this.http.get(ApiConfig.baseUrl + 'sale-invoices', { params });
  }

  getActiveClients(): Observable<any> {
    return this.http.get(ApiConfig.baseUrl + 'clients/active');
  }
}
