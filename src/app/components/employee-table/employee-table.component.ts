import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

export interface TableElement {
    id: string;
    nid: string;
    name: string;
    phone: string;
    address: string;
}


const ELEMENT_DATA: TableElement[] = [];

@Component({
    selector: 'app-employee-table',
    templateUrl: './employee-table.component.html',
    styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit {


    displayedColumns: string[] = ['id', 'name', 'phone', 'address', 'actions'];
    dataSource: MatTableDataSource<TableElement>;
    employeeList: TableElement[];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
    @ViewChild(MatSort, {static: true}) sort: MatSort | any;

    constructor(private _router: Router,
                private _orderService: OrderService) {
        this.employeeList = ELEMENT_DATA;
        this.dataSource = new MatTableDataSource(this.employeeList);
    }

    ngOnInit(): void {
        this.getEmployeeList();
    }

    getEmployeeList() {
        this._orderService.getEmployeeList().subscribe((resp: any) => {

            this.employeeList = [];
            this.employeeList = resp;
            console.log(this.employeeList);
            this.dataSource = new MatTableDataSource(this.employeeList);
            setTimeout(() => {
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator
            });
        });
    }

    createEmployee() {
        this._router.navigateByUrl('/employee-create').then(() => console.log(""));
    }

    editEmployee(employeeId: any) {
        this._router.navigate(
            ['employee-create'],
            {queryParams: {employeeId: employeeId}}
        ).then();
    }

    applyFilter(e: any): void {
        const filterValue = e.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
