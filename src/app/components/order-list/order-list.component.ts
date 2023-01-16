import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

    displayedColumns: string[] = ['id', 'orderNo', 'clientName', 'orderDate',
        'patientName', 'deliveryDate', 'madeBy', 'amount', 'status', 'actions'];
    dataSource: MatTableDataSource<any>;
    itemList: any = [];

    @ViewChild(MatSort, {static: true}) sort: MatSort | any;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;

    constructor(private _router: Router) {
        this.itemList = [
            {
                id: "001",
                orderNo: "15LuST2U",
                clientName: "Jasmine",
                orderDate: "17/06/2005",
                patientName: "Turner",
                deliveryDate: "25/12/2012",
                madeBy: "Edward",
                amount: "5048",
                status: "Delivered",
            },
            {
                id: "002",
                orderNo: "tqrw6gud",
                clientName: "Martin",
                orderDate: "20/10/2014",
                patientName: "Toby",
                deliveryDate: "05/12/2014",
                madeBy: "Chandler",
                amount: "2796",
                status: "In-Trial",
            },
            {
                id: "003",
                orderNo: "bkObDGhM",
                clientName: "Killian",
                orderDate: "29/08/2015",
                patientName: "Jayvon",
                deliveryDate: "06/04/2016",
                madeBy: "Lillian",
                amount: "7698",
                status: "Redo",
            },
            {
                id: "004",
                orderNo: "pCVXXcp9",
                clientName: "Rylie",
                orderDate: "20/04/2018",
                patientName: "Dakota",
                deliveryDate: "11/10/2019",
                madeBy: "Kyla",
                amount: "2828",
                status: "In-Process",
            },
            {
                id: "005",
                orderNo: "9jo0PXA4",
                clientName: "Albert",
                orderDate: "18/12/2019",
                patientName: "Avery",
                deliveryDate: "20/06/2020",
                madeBy: "Gustavo",
                amount: "1215",
                status: "Received",
            },

        ];
        this.dataSource = new MatTableDataSource(this.itemList);
    }

    ngOnInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    createAttendance() {
        this._router.navigateByUrl('orders/create').then(() => console.log(""));
    }

    applyFilter(e: any): void {
        const filterValue = e.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
