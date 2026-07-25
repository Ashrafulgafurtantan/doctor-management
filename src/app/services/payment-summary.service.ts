import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiConfig } from "../utility/apiConfig";

@Injectable({
  providedIn: "root",
})
export class PaymentSummaryService {
  constructor(private http: HttpClient) {}

  /** Paginated list of payment summaries */
  getPaymentSummaries(page: number = 1): Observable<any> {
    const params = new HttpParams().set("page", page.toString());
    return this.http.get(ApiConfig.baseUrl + ApiConfig.getPaymentSummaries, {
      params,
    });
  }

  /** A single payment summary with its orders */
  getPaymentSummaryById(id: any): Observable<any> {
    return this.http.get(
      ApiConfig.baseUrl + ApiConfig.getPaymentSummaryById + id
    );
  }
}
