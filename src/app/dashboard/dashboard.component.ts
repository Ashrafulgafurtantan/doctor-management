import {Component, OnInit} from '@angular/core';
// @ts-ignore
import Swal from "sweetalert2/dist/sweetalert2.js";
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    isLoginNeeded = false;

    constructor(private _router: Router) {
        // @ts-ignore
        this.isLoginNeeded = this._router.getCurrentNavigation().extras.state?.needCredentials;
    }

    ngOnInit(): void {
        if (this.isLoginNeeded) {
            this.alertWithSuccess();
        }
    }


    alertWithSuccess() {
        Swal.fire('Good Job!', 'Successfully Logged In.', 'success')
    }

    gotoOrderPage() {
        this._router.navigate(["/orders"]).then();
    }
    gotoEmployeePage() {
            this._router.navigate(["/employees"]).then();
        }
    gotoClientPage() {
        this._router.navigate(["/clients"]).then();
    }
    gotoItemPage() {
        this._router.navigate(["/items"]).then();
    }



}
