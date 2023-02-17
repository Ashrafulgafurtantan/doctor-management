// @ts-nocheck
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertMessageService} from "../../services/alert-message.service";
import {AuthenticationService} from "../../services/authentication.service";
import {OrderService} from "../../services/order.service";
import {AssetService} from "../../services/asset.service";

@Component({
    selector: 'app-asset-create',
    templateUrl: './asset-create.component.html',
    styleUrls: ['./asset-create.component.scss']
})
export class AssetCreateComponent implements OnInit {
    assetCreateForm: FormGroup | any;
    employeeList!: [];

    updateAssetId: any = null;

    constructor(public formBuilder: FormBuilder,
                private _alertMsg: AlertMessageService,
                private _authService: AuthenticationService,
                private _activateRoute: ActivatedRoute,
                private _orderService: OrderService,
                private _router: Router, private _assetService: AssetService) {
    }

    ngOnInit(): void {
        this.formInit();
        this.getEmployeeList();
    }

    formInit() {
        this.assetCreateForm = this.formBuilder.group({
            employee_id: ['', [Validators.required]],
            name: ['', [Validators.required]],
            description: [''],
            amount: ['', [Validators.required]],
            buying_time: ['', [Validators.required]],
        });
    }

    getEmployeeList() {
        this._orderService.getEmployeeList().subscribe((resp: any) => {
            this.employeeList = [];
            this.employeeList = resp;
        });
    }

    submit() {
        let formData = this.assetCreateForm.value;
        formData['buying_time'] = formData['buying_time'].toLocaleDateString();
        if (this.assetCreateForm.valid) {
            if (this.updateAssetId) {
                formData['id'] = this.updateAssetId;
                this.updateAsset(formData);
            } else {
                this.createAsset(formData);
            }
        }
    }

    createAsset(formData: FormData) {
        this._assetService.assetCreatePostRequest(formData)
            .subscribe((resp: any) => {
                this._alertMsg.successfulSubmissionAlert('Asset Created Successfully');
                this._router.navigateByUrl('/asset-list').then();
            }, (error: any) => this._authService.httpRequestErrorHandler(error));
    }

    updateAsset(formData: FormData) {
        this._assetService.assetUpdatePutRequest(formData)
            .subscribe((resp: any) => {
                this._alertMsg.successfulSubmissionAlert('Asset Updated Successfully');
                this._router.navigateByUrl('/asset-list').then();
            }, (error: any) => this._authService.httpRequestErrorHandler(error));
    }

    cancel() {
        this._router.navigateByUrl('/asset-list').then();
    }
}
