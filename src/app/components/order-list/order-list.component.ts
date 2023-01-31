// @ts-nocheck
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {ApiConfig} from "../../utility/apiConfig";
import {AlertMessageService} from "../../services/alert-message.service";

export interface OrderTableElement {
    id: number;
    order_no: string;
    client_id: string;
    order_date: string;
    patient_name: string;
    delivery_date: string;
    employee_id: string;
    total_amount: number;
    status: number;
}

export enum OrderStatus {
    0 = 'Received',
    1 = 'In-progress',
    2 = 'redo',
    3 = 'trial',
    4 = 'delivered',
}

const ELEMENT_DATA: OrderTableElement[] = [];

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'order_no', 'client_id', 'order_date',
        'patient_name', 'delivery_date', 'employee_id', 'total_amount', 'status', 'actions'];
    dataSource: MatTableDataSource<OrderTableElement>;
    itemList: OrderTableElement[];
    apiConfig = ApiConfig;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
    @ViewChild(MatSort, {static: true}) sort: MatSort | any;

    constructor(private _router: Router,
                private _alertMsg: AlertMessageService,
                private _orderService: OrderService) {
        this.itemList = ELEMENT_DATA;
        this.dataSource = new MatTableDataSource(this.itemList);
    }


    ngOnInit(): void {
        this.getOrderList();
    }

    getOrderList() {
        this._orderService.getOrderListRequest().subscribe((resp: any) => {
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

    deleteOrder(index: any) {
        this._alertMsg.deleteItemAlert().then((res: any) => {
            if (res) {
                this._orderService.deleteOrderById(index).subscribe((resp: any) => {
                    this.getOrderList();
                    this._alertMsg.successfulSubmissionAlert('Delete Order Successfully');
                });
            }
        });

    }


    changeStatusOrder(index) {
        this._router.navigate([`orders/status/${this.itemList[index].id}`]).then();

    }

    editOrder(index) {
        this._router.navigate(
            ['orders/create'],
            {queryParams: {orderId: this.itemList[index].id}}
        ).then();
    }

    applyFilter(e: any): void {
        const filterValue = e.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
