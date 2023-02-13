// @ts-nocheck
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {ApiConfig} from "../../utility/apiConfig";
import {AlertMessageService} from "../../services/alert-message.service";
import {TodayService} from "../../services/today.service";
import {OrderTableElement} from "../order-list/order-list.component";
import {OrderStatus} from "../order-list/order-list.component";

const ELEMENT_DATA: OrderTableElement[] = [];

@Component({
    selector: 'app-today-order-delivered',
    templateUrl: './today-delivered.component.html',
    styleUrls: ['./today-delivered.component.scss']
})
export class TodayDeliveredComponent implements OnInit {

    displayedColumns: string[] = ['id', 'order_no', 'client_id', 'order_date',
        'patient_name', 'delivery_date', 'employee_id', 'total_amount', 'status'];
    dataSource: MatTableDataSource<OrderTableElement>;
    itemList: OrderTableElement[];
    apiConfig = ApiConfig;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
    @ViewChild(MatSort, {static: true}) sort: MatSort | any;

    constructor(private _router: Router,
                private _alertMsg: AlertMessageService,
                private _todayDelivered: TodayService) {
        this.itemList = ELEMENT_DATA;
        this.dataSource = new MatTableDataSource(this.itemList);
    }


    ngOnInit(): void {
        this.getTodayOrderDeliveredList();
    }

    getTodayOrderDeliveredList() {
        this._todayDelivered.getTodayOrderDeliveredList().subscribe((resp: any) => {
            console.log(resp);
            this.itemList = [];
            this.itemList = resp;
            this.itemList.forEach((item: OrderTableElement) => {
                item.status = OrderStatus[item.status];
            });
            this.dataSource = new MatTableDataSource(this.itemList);
            setTimeout(() => {
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator
            });
        });
    }

    applyFilter(e: any): void {
        const filterValue = e.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
