import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiConfig} from "../utility/apiConfig";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
//orders/clients/4/start/2022-12-30/end/2023-01-18
    constructor(private _router: Router,
                private http: HttpClient,) {
    }

    getClientOrderList(formObj: any) {
        return this.http.get(ApiConfig.baseUrl + `orders/clients/${formObj.id}/start/${formObj.startDate}/end/${formObj.endDate}`);
    }
}
