// @ts-nocheck
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {AttendanceService} from "../../../services/attendance.service";

export interface PeriodicElement {
    id: number;
    name: string;
    priority: string;
    badge: string;
    date: string;
}

enum AttendanceStatus {
    1 = {
        'status': 'Present',
        'color': 'badge-success'
    },

    2 = {
        'status': 'Half Present',
        'color': 'badge-info'
    },
    3 = {
        'status': 'Leave',
        'color': 'badge-primary'
    },
    4 = {
        'status': 'Absent',
        'color': 'badge-danger'
    },
}

const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    displayedColumns: string[] = ['id', 'assigned', 'priority', 'date'];
    dataSource: MatTableDataSource<any>;
    products: PeriodicElement[];

    @ViewChild(MatSort, {static: true}) sort: MatSort | any;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;

    constructor(private _router: Router, private _attendanceService: AttendanceService) {
        this.products = ELEMENT_DATA;
        this.dataSource = new MatTableDataSource(this.products);
    }

    ngOnInit(): void {
        this.getAttendanceList();
    }

    getAttendanceList() {
        this._attendanceService.getAttendanceList().subscribe((resp: any) => {
            console.log(resp);
            for (let key in resp) {
                const obj = resp[key];
                obj.forEach((item: any) => {
                    const real: PeriodicElement = {
                        priority: AttendanceStatus[item.status]['status'],
                        badge: AttendanceStatus[item.status]['color'],
                        date: '23-0-2023',
                        id: item.id,
                        name: item.employee_id,
                    }
                    ELEMENT_DATA.push(real);

                });
            }
            this.products = [];
            this.products = ELEMENT_DATA;
            this.dataSource = new MatTableDataSource(this.products);
            setTimeout(() => {
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator
            });
        });
    }

    createAttendance() {
        this._router.navigateByUrl('/create').then(() => console.log(""));
    }

    applyFilter(e: any): void {
        const filterValue = e.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
