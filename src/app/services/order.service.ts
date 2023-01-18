import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiConfig} from "../utility/apiConfig";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    isEnteredForCreateOrder!: null;

    constructor(private _router: Router,
                private http: HttpClient,) {
    }

    getOrderCreatePageEntryReason(): any {
        return this.isEnteredForCreateOrder;
    }

    setOrderCreatePageEntryReason(res: any) {
        this.isEnteredForCreateOrder = res;
    }

    getOrderById(id: any) {
        return this.http.get(ApiConfig.baseUrl + 'orders/' + id);
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

    orderUpdatePutRequest(formData: any) {
        return this.http.put(ApiConfig.baseUrl + ApiConfig.putOrderUpdate, formData);
    }

    changeOrderStatus(formObj: any) {
        return this.http.put(ApiConfig.baseUrl + ApiConfig.putOrderStatusUpdate, formObj);
    }

    getOrderListRequest() {
        return this.http.get(ApiConfig.baseUrl + ApiConfig.getOrderList);
    }
}
