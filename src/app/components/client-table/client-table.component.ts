import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {OrderService} from "../../services/order.service";

@Component({
    selector: 'app-client-table',
    templateUrl: './client-table.component.html',
    styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {


    displayedColumns: string[] = ['id', 'name', 'doctor_name', 'phone', 'address', 'actions'];
    dataSource: MatTableDataSource<any>;
    clientList: any;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
    @ViewChild(MatSort, {static: true}) sort: MatSort | any;

    constructor(private _router: Router, private _orderService: OrderService) {
        this.clientList = [];
        this.dataSource = new MatTableDataSource(this.clientList);
    }

    ngOnInit(): void {
        this.getClientList();
    }

    getClientList() {
        this._orderService.getClientList().subscribe((resp: any) => {
            this.clientList = [];
            this.clientList = resp;
            console.log(this.clientList);
            this.dataSource = new MatTableDataSource(this.clientList);
            setTimeout(() => {
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator
            });
        });
    }

    editClient(clientId: any) {
        console.log(clientId);
        this._router.navigate(
            ['client-create'],
            {queryParams: {clientId: clientId}}
        ).then();
    }

    createClient() {
        this._router.navigateByUrl('/client-create').then(() => console.log(""));
    }

    applyFilter(e: any): void {
        const filterValue = e.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
