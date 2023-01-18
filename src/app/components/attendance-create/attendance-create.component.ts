import {Component, OnInit} from '@angular/core';
import {AttendanceModel} from "../../models/attendance.model";
import {Router} from "@angular/router";
import {AttendanceService} from "../../services/attendance.service";
import {Subscription} from "rxjs";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
    selector: 'app-attendance-create',
    templateUrl: './attendance-create.component.html',
    styleUrls: ['./attendance-create.component.scss']
})
export class AttendanceCreateComponent implements OnInit {

    attendanceList: AttendanceModel[] = [];
    employeeListSubscription: Subscription | undefined;
    dateTimeString: string | undefined;
    dateError: boolean = false;
    employeeList: any = [];

    constructor(private _router: Router, private _attendanceService: AttendanceService) {
    }

    ngOnInit(): void {
        this.getEmployeeList();
    }

    addEvent(event: MatDatepickerInputEvent<Date>) {
        this.dateTimeString = event.value?.toLocaleDateString();
    }

    getEmployeeList() {
        this.employeeListSubscription = this._attendanceService.getEmployeeList().subscribe((resp: any) => {
            resp.forEach((item: any) => {
                let attendance = new AttendanceModel();
                attendance.id = item.id;
                attendance.name = item.name;
                this.attendanceList.push(attendance);
            });
        });
    }

    createEmployeeList(id: number, status: number) {
        this.employeeList.push({
            id: id,
            status: status,
        });
    }

    onSubmit() {
        if (this.dateTimeString == undefined) {
            this.dateError = true;
            return;
        }
        this.attendanceList.map((item: AttendanceModel) => {
            if (item.present) {
                this.createEmployeeList(Number(item.id), 1);
            } else if (item.halfPresent) {
                this.createEmployeeList(Number(item.id), 2);
            } else if (item.leave) {
                this.createEmployeeList(Number(item.id), 3);
            } else if (item.absent) {
                this.createEmployeeList(Number(item.id), 4);
            }
        });
        const obj = {
            date: this.dateTimeString,
            employees: this.employeeList,
        };
        this._attendanceService.postAttendance(obj).subscribe((resp: any) => {
            this._router.navigateByUrl('/attendance-list').then();
        });

    }

    cancel() {
        this._router.navigateByUrl('/attendance-list').then();
    }
}
