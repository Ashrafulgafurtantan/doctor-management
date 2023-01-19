// @ts-nocheck
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AttendanceService} from "../../services/attendance.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

export interface TableElement {
    id: string;
    employee_id: string;
    date: string;
    status: string;
    badge: string;
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

const ELEMENT_DATA: TableElement[] = [];

@Component({
    selector: 'app-attendance-list',
    templateUrl: './attendance-list.component.html',
    styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {
    /* {
            "id": 12,
            "employee_id": 1,
            "date": "2023-03-01 00:00:00",
            "status": 4,
            "created_at": "2023-01-18T14:38:46.000000Z",
            "updated_at": "2023-01-18T14:38:46.000000Z",
            "employee": {
                "id": 1,
                "employee_no": "000001",
                "name": "Purba",
                "phone": "01782222786",
                "nid": "HK5L31674052538_nid.png",
                "address": "Jigatola",
                "created_at": "2023-01-18T14:35:38.000000Z",
                "updated_at": "2023-01-18T14:35:38.000000Z"
            }
        }*/
    displayedColumns: string[] = ['date', 'name', 'id', 'status'];
    dataSource: MatTableDataSource<TableElement>;
    attendanceList: TableElement[];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
    @ViewChild(MatSort, {static: true}) sort: MatSort | any;

    constructor(private _router: Router, private _attendanceService: AttendanceService) {
        this.attendanceList = ELEMENT_DATA;
        this.dataSource = new MatTableDataSource(this.attendanceList);
    }

    ngOnInit(): void {
        this.getAttendanceList();
    }

    getAttendanceList() {
        this._attendanceService.getAttendanceList().subscribe((resp: any) => {
            console.log(resp);
            resp.forEach((item) => {
                const real: TableElement = {
                    badge: AttendanceStatus[item.status]['color'],
                    id: item.employee['id'],
                    name: item.employee['name'],
                    date: item.date.substring(0, 10),
                    status: AttendanceStatus[item.status]['status'],
                }
                ELEMENT_DATA.push(real);
            });
           
            this.attendanceList = [];
            this.attendanceList = ELEMENT_DATA;
            this.dataSource = new MatTableDataSource(this.attendanceList);
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
