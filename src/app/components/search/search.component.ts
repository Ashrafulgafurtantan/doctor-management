// @ts-nocheck
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertMessageService} from "../../services/alert-message.service";
import {Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {OrderService} from "../../services/order.service";
import {SearchService} from "../../services/search.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderStatus} from "../order-list/order-list.component";

const ELEMENT_DATA: OrderTableElement[] = [];

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    displayedColumns: string[] = ['id', 'order_no', 'client_id', 'order_date',
        'patient_name', 'delivery_date', 'employee_id', 'total_amount', 'status', 'actions'];
    dataSource: MatTableDataSource<OrderTableElement>;
    itemList: OrderTableElement[];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
    @ViewChild(MatSort, {static: true}) sort: MatSort | any;


    searchFormGroup!: FormGroup;
    clientList!: [];
    address!: any;

    constructor(public formBuilder: FormBuilder,
                private _alertMsg: AlertMessageService,
                private _searchService: SearchService,
                private _router: Router, private _orderService: OrderService) {
        this.itemList = ELEMENT_DATA;
        this.dataSource = new MatTableDataSource(this.itemList);
    }

    ngOnInit(): void {
        this.formInit();
        this.getClientList();
    }

    formInit() {
        this.searchFormGroup = this.formBuilder.group({
            id: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
        });
    }

    getClientList() {
        this._orderService.getClientList().subscribe((resp: any) => {
            this.clientList = [];
            this.clientList = resp;
        });
    }

    onChangeClientOption(e: any) {
        const selected = this.clientList.filter((item: any) => item.id == e);
        this.address = selected[0]['address'];
    }


    onSubmit() {
        if (this.searchFormGroup.valid) {
            let data = this.searchFormGroup.value;
            data['startDate'] = this.convertDateString(data['startDate'].toLocaleDateString());
            data['endDate'] = this.convertDateString(data['endDate'].toLocaleDateString());
            console.log(data);
            this._searchService.getClientOrderList(data).subscribe((item: any) => {
                console.log(item);
                this.itemList = item;
                this.itemList.forEach((item: OrderTableElement) => {
                    item.status = OrderStatus[item.status];
                });
                console.log(this.itemList);
                this.dataSource = new MatTableDataSource(this.itemList);
                setTimeout(() => {
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator
                });
            }, (error: any) => this._authService.httpRequestErrorHandler(error));
        }
    }

    convertDateString(data: any): string {
        let list = data.split("/");
        return list[2] + "-" + list[0] + '-' + list[1];
    }

    changeStatusOrder(index) {
        this._router.navigate([`orders/status/${this.itemList[index].id}`]).then();
    }

    deleteOrder() {

    }

    editOrder(index) {
        this._router.navigate(
            ['orders/create'],
            {queryParams: {orderId: this.itemList[index].id}}
        ).then();
    }

    applyFilter(e: any): void {
        const filterValue = e.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
