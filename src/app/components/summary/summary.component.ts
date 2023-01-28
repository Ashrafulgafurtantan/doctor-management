import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertMessageService} from "../../services/alert-message.service";
import {SearchService} from "../../services/search.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {MatTableDataSource} from "@angular/material/table";
import {ApiConfig} from "../../utility/apiConfig";

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
    summaryFormGroup!: FormGroup;
    title!: any;
    clientList!: [];
    address!: any;
    startDateString!: any;
    endDateString!: any;
    clientId!: any;
    apiConfig = ApiConfig;
    params!: any;
    workStatusHref = "";
    workHref = "";
    allWorkStatusHref = "";

    //all-work-status

    constructor(public formBuilder: FormBuilder,
                private _activatedRoute: ActivatedRoute,
                private _alertMsg: AlertMessageService,
                private _searchService: SearchService,
                private _router: Router, private _orderService: OrderService) {
    }

    ngOnInit(): void {
        this.formInit();
        this.getClientList();
        this.summaryType();
    }

    summaryType() {
        this._activatedRoute.paramMap.subscribe((params) => {
            this.params = params.get('summaryType');
            if (this.params == 'work-status') {
                this.title = "Report - Work Status Wise Summary";
            } else if (this.params == 'work') {
                this.title = "Report - Work Summary";
            } else if (this.params == 'all-work-status') {
                this.title = "Report - All Work Status Summary";
            }
        });
    }

    formatHref() {
        //summary/all/start/{start_date}/end/{end_date}
        this.workStatusHref = `${this.apiConfig.downloadPdfUrl}clients/${this.clientId}/start/${this.startDateString}/end/${this.endDateString}`;
        this.workHref = `${this.apiConfig.downloadPdfUrl}summary/clients/${this.clientId}/start/${this.startDateString}/end/${this.endDateString}`;
        this.allWorkStatusHref = `${this.apiConfig.downloadPdfUrl}summary/all/start/${this.startDateString}/end/${this.endDateString}`;
    }

    formInit() {
        this.summaryFormGroup = this.formBuilder.group({
            id: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
        });
    }

    getClientList() {
        this._orderService.getClientList().subscribe((resp: any) => {
            this.clientList = [];
            this.clientList = resp;
        });
    }

    onChangeClientOption(e: any) {
        this.clientId = e;
        const selected = this.clientList.filter((item: any) => item.id == e);
        this.address = selected[0]['address'];
        this.formatHref();
    }

    onStartDateChange() {
        this.startDateString = this.convertDateString(this.summaryFormGroup.value.startDate.toLocaleDateString());
        console.log(this.startDateString);
        this.formatHref();
    }

    onEndDateChange() {
        this.endDateString = this.convertDateString(this.summaryFormGroup.value.endDate.toLocaleDateString());
        console.log(this.endDateString);
        this.formatHref();
    }

    convertDateString(data: any): string {
        let list = data.split("/");
        return list[2] + "-" + list[0] + '-' + list[1];
    }


    onSubmit() {
        console.log(this.apiConfig.downloadPdfUrl + `clients/${this.clientId}/start/${this.startDateString}/end/${this.endDateString}`);
    }

}
