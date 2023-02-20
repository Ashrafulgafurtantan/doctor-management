// @ts-nocheck
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertMessageService} from "../../services/alert-message.service";
import {Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {OrderService} from "../../services/order.service";
import {SearchService} from "../../services/search.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderStatus, OrderTableElement} from "../order-list/order-list.component";
import {DateTimeService} from "../../services/date-time.service";
import {ApiConfig} from "../../utility/apiConfig";

const ELEMENT_DATA: OrderTableElement[] = [];

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    displayedColumns: string[] = ['id', 'order_no', 'client_id', 'order_date',
        'patient_name', 'delivery_date', 'employee_id', 'total_amount', 'status', 'actions'];
    dataSource: MatTableDataSource<OrderTableElement>;
    itemList: OrderTableElement[];
    apiConfig = ApiConfig;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
    @ViewChild(MatSort, {static: true}) sort: MatSort | any;


    searchFormGroup!: FormGroup;
    clientList!: [];
    address!: any;

    constructor(public formBuilder: FormBuilder,
                private _alertMsg: AlertMessageService,
                private _dateTimeService: DateTimeService,
                private _searchService: SearchService,
                private _router: Router, private _orderService: OrderService) {
        this.itemList = ELEMENT_DATA;
        this.dataSource = new MatTableDataSource(this.itemList);
    }

    ngOnInit(): void {
        this.formInit();
        this.getClientList();
    }

    formInit() {
        this.searchFormGroup = this.formBuilder.group({
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
        const selected = this.clientList.filter((item: any) => item.id == e);
        this.address = selected[0]['address'];
    }

    /*    onSubmit() {
            let data = this.searchFormGroup.value;
            console.log(this._dateTimeService.getYearMonthDayFormat(data['startDate']));
            console.log(this._dateTimeService.getYearMonthDayFormat(data['endDate']));
        }*/

    onSubmit() {
        if (this.searchFormGroup.valid) {
            const id = this.searchFormGroup.value.id;
            const startDate = this._dateTimeService.getYearMonthDayFormat(this.searchFormGroup.value.startDate);
            const endDate = this._dateTimeService.getYearMonthDayFormat(this.searchFormGroup.value.endDate);
            const data = {
                id: id,
                startDate: startDate,
                endDate: endDate,
            };
            this._searchService.getClientOrderList(data).subscribe((item: any) => {
                this.itemList = [];
                this.itemList = item;
                this.itemList.forEach((item: OrderTableElement) => {
                    item.status = OrderStatus[item.status];
                });
                console.log(this.itemList);
                setTimeout(() => {
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                    this.dataSource = new MatTableDataSource(this.itemList);
                });
            }, (error: any) => this._authService.httpRequestErrorHandler(error));
        }
    }

    convertDateString(data: any): string {
        let list = data.split("/");
        return list[2] + "-" + list[0] + '-' + list[1];
    }

    changeStatusOrder(index) {
        this._router.navigate([`orders/status/${this.itemList[index].id}`]).then();
    }

    deleteOrder(orderId: any) {
        this._alertMsg.deleteItemAlert().then((res: any) => {
            if (res) {
                this._orderService.deleteOrderById(orderId).subscribe((resp: any) => {
                    this.getOrderList();
                    this._alertMsg.successfulSubmissionAlert('Delete Order Successfully');
                });
            }
        });
    }


    editOrder(orderId) {
        this._router.navigate(
            ['orders/create'],
            {queryParams: {orderId: orderId}}
        ).then();
    }


    applyFilter(e: any): void {
        const filterValue = e.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
