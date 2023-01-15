import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-order-create',
    templateUrl: './order-create.component.html',
    styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
    orderCreateForm: FormGroup | any;

    displayedColumns: string[] = ['actions', 'itemName', 'description', 'qty', 'price'];
    dataSource: MatTableDataSource<any>;
    itemList: any = [];
    leftUpper: any = [18, 17, 16, 15, 14, 13, 12, 11];
    leftDown: any = [48, 47, 46, 45, 44, 43, 42, 41];
    rightUpper: any = [21, 22, 23, 24, 25, 26, 27, 28];
    rightDown: any = [31, 32, 33, 34, 35, 36, 37, 38];

    constructor(private _router: Router) {
        this.itemList = [
            /* {
                 itemName: "Jasmine",
                 description: "Edward",
                 qty: "001",
                 price: "5048",

             },
             {

                 itemName: "Martin",
                 description: "Chandler",
                 qty: "002",
                 price: "2796",
             },
             {

                 itemName: "Killian",
                 description: "Lillian",
                 qty: "003",
                 price: "7698",
             },
             {

                 itemName: "Rylie",
                 description: "Kyla",
                 qty: "004",
                 price: "2828",
             },*/

        ];
        this.dataSource = new MatTableDataSource(this.itemList);
    }

    ngOnInit(): void {
    }

    submitOrder() {
        this.itemList.push({
            itemName: "Albert",
            description: "Gustavo",
            qty: "005",
            price: "1215",
        });
        this.dataSource = new MatTableDataSource(this.itemList);
    }

}
