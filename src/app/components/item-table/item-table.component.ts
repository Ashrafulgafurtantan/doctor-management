import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {OrderService} from "../../services/order.service";

@Component({
    selector: 'app-item-table',
    templateUrl: './item-table.component.html',
    styleUrls: ['./item-table.component.scss']
})
export class ItemTableComponent implements OnInit {


    displayedColumns: string[] = ['id', 'name', 'price'];
    dataSource: MatTableDataSource<any>;
    itemList: any;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
    @ViewChild(MatSort, {static: true}) sort: MatSort | any;

    constructor(private _router: Router, private _orderService: OrderService) {
        this.itemList = [];
        this.dataSource = new MatTableDataSource(this.itemList);
    }

    ngOnInit(): void {
        this.getItemList();
    }

    getItemList() {
        this._orderService.getItemList().subscribe((resp: any) => {
            this.itemList = [];
            this.itemList = resp;
            this.dataSource = new MatTableDataSource(this.itemList);
            setTimeout(() => {
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator
            });
        });
    }

    createItem() {
        this._router.navigateByUrl('/item-create').then(() => console.log(""));
    }

    applyFilter(e: any): void {
        const filterValue = e.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
