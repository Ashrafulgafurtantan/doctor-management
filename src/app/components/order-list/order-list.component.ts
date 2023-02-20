// @ts-nocheck
import {Component, OnInit, ViewChild} from '@angular/core';
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

    first = 1;
    last = null;
    current = null;
    nextPageUrl = null;
    prevPageUrl = null;

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
            this.getDataSyncWithLocalVariable(resp);
        });
    }

    getDataSyncWithLocalVariable(resp: any) {
        this.itemList = [];
        this.itemList = resp.data;
        this.current = resp.current_page;
        this.last = resp.last_page;
        this.nextPageUrl = resp.next_page_url;
        this.prevPageUrl = resp.prev_page_url;
        this.itemList.forEach((item: OrderTableElement) => {
            item.status = OrderStatus[item.status];

        });
        this.dataSource = new MatTableDataSource(this.itemList);
        /* setTimeout(() => {
             this.dataSource.sort = this.sort;
             this.dataSource.paginator = this.paginator
         });*/
    }

    nextBtnClick() {
        if (this.nextPageUrl) {
            this.current = null;
            this._orderService.navigateToNextPage(this.nextPageUrl).subscribe(resp => this.getDataSyncWithLocalVariable(resp));
        }
    }

    prevBtnClick() {
        if (this.prevPageUrl) {
            this.current = null;
            this._orderService.navigateToPreviousPage(this.prevPageUrl).subscribe(resp => this.getDataSyncWithLocalVariable(resp));
        }
    }

    numberBtnClick(e) {
        this.current = null;
        this._orderService.navigateToNumberPage(e).subscribe(resp => this.getDataSyncWithLocalVariable(resp));
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

    changeStatusOrder(orderId) {
        this._router.navigate([`orders/status/${orderId}`]).then();

    }

    editOrder(orderId) {
        this._router.navigate(
            ['orders/create'],
            {queryParams: {orderId: orderId}}
        ).then();
    }

}
