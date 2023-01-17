import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiConfig} from "../utility/apiConfig";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private _router: Router,
                private http: HttpClient,) {
    }

    getEmployeeList() {
        return this.http.get(ApiConfig.baseUrl + ApiConfig.getEmployeeList);
    }

    getClientList() {
        return this.http.get(ApiConfig.baseUrl + ApiConfig.getClientList);
    }

    getItemList() {
        return this.http.get(ApiConfig.baseUrl + ApiConfig.getItemList);
    }

    orderCreatePostRequest(formData: any) {
        return this.http.post(ApiConfig.baseUrl + ApiConfig.postOrderCreate, formData);
    }

    getOrderListRequest() {
        return this.http.get(ApiConfig.baseUrl + ApiConfig.getOrderList);
    }
}
