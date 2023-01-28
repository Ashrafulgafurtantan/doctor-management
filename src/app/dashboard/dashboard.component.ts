import {Component, OnInit} from '@angular/core';
// @ts-ignore
import Swal from "sweetalert2/dist/sweetalert2.js";
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from "../services/storage.service";
import {AlertMessageService} from "../services/alert-message.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private _router: Router,
                private _activateRoute: ActivatedRoute,
                private _alertMsg: AlertMessageService) {
    }

    ngOnInit(): void {
        this.showLoginAlertOrNot();
    }

    showLoginAlertOrNot() {
        this._activateRoute.queryParams
            .subscribe(params => {
                    if (params.login) {
                        this._alertMsg.loginSuccessfulAlert();
                    }
                }
            );
    }

    gotoOrderPage() {
        this._router.navigate(["/orders"]).then();
    }

    gotoEmployeePage() {
        this._router.navigate(["/employee-list"]).then();
    }

    gotoClientPage() {
        this._router.navigate(["/client-list"]).then();
    }

    gotoItemPage() {
        this._router.navigate(["/item-list"]).then();
    }


}
