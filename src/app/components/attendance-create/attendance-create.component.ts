import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/attendance.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-attendance-create',
  templateUrl: './attendance-create.component.html',
  styleUrls: ['./attendance-create.component.scss']
})
export class AttendanceCreateComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
    this.getProducts();
  }
  products: Product[] = [];


  getProducts(): void {
    this.products=[

      {
        employeeId: 1,
        employeeName: "Ashraf",
        leave: false,
        absent:false,
        present: false,
        halfPresent: false,
      },
      {
      employeeId: 2,
        employeeName: "Sun",
        leave: false,
        absent:false,
        present: false,
        halfPresent: false,
      },
      {
        employeeId: 3,
        employeeName: "Akram",
        leave: false,
        absent:false,
        present: false,
        halfPresent: false,
      },
      {
        employeeId: 4,
        employeeName: "Ryan",
        leave: false,
        absent:false,
        present: false,
        halfPresent: false,
      },  {
        employeeId: 5,
        employeeName: "Ifti",
        leave: false,
        absent:false,
        present: false,
        halfPresent: false,
      },

    ];
  }
  submit(){
    console.log(this.products);
  }
  cancel(){
    this._router.navigateByUrl('/table').then();
  }
}
