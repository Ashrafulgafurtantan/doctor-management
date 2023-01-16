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


    onSubmit() {
        if (this.dateTimeString == undefined) {
            this.dateError = true;
            return;
        }
        this.attendanceList.map((item: AttendanceModel) => {
            item.status = item.present ? 1 : item.halfPresent ? 2 : item.leave ? 3 : 4;
        });
        const obj = {
            date: this.dateTimeString,
            employees: [
                ...this.attendanceList
            ]
        };
        this._attendanceService.postAttendance(obj).subscribe((resp: any) => {
            console.log(resp);
        });

    }

    cancel() {
        this._router.navigateByUrl('/table').then();
    }
}
