// @ts-nocheck
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {AttendanceService} from "../../services/attendance.service";
import {TableElement} from "../attendance-list/attendance-list.component";
import {OrderService} from "../../services/order.service";

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

enum OrderStatus {
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

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
    @ViewChild(MatSort, {static: true}) sort: MatSort | any;

    constructor(private _router: Router, private _orderService: OrderService) {
        this.itemList = ELEMENT_DATA;
        this.dataSource = new MatTableDataSource(this.itemList);
    }


    ngOnInit(): void {
        this.getOrderList();
    }

    getOrderList() {
        this._orderService.getOrderListRequest().subscribe((resp: any) => {
            console.log(resp);
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

    deleteOrder() {

    }

    changeStatusOrder(index) {
        this._router.navigate([`orders/status/${this.itemList[index].id}`]).then();
    }

    editOrder(index) {
        this._orderService.setOrderCreatePageEntryReason(this.itemList[index].id);
        this._router.navigate(['orders/create']).then();
    }

    applyFilter(e: any): void {
        const filterValue = e.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
