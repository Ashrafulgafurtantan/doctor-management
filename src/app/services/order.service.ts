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

    getOrderListRequest() {
        //return this.http.get(ApiConfig.baseUrl + ApiConfig.getOrderList);
        return this.http.get(ApiConfig.baseUrl + ApiConfig.getOrderListPagewise);
    }

    changeOrderStatus(formObj: any) {
        return this.http.put(ApiConfig.baseUrl + ApiConfig.putOrderStatusUpdate, formObj);
    }

    deleteOrderById(id: any) {
        return this.http.delete(ApiConfig.baseUrl + ApiConfig.deleteOrder + "/" + id);
    }

    navigateToNextPage(url: any) {
        return this.http.get(url);
    }

    navigateToPreviousPage(url: any) {
        return this.http.get(url);
    }

    navigateToNumberPage(number: any) {
// "https://api.32vivadent.com/api/orders?page=2"
        return this.http.get(ApiConfig.baseUrl + ApiConfig.page + number);
    }
}
