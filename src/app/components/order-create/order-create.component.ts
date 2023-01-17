// @ts-nocheck
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../services/order.service";
import {SHADE_LIST} from './shade-data';
import {SHADE_GUID_LIST} from './shade-data';

@Component({
    selector: 'app-order-create',
    templateUrl: './order-create.component.html',
    styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
    orderCreateForm: FormGroup | any;
// quantity
    displayedColumns: string[] = ['actions', 'itemName', 'description', 'quantity', 'price'];

    dataSource: MatTableDataSource<any>;
    itemList: any = [];
    leftUpper: any = [18, 17, 16, 15, 14, 13, 12, 11];
    leftDown: any = [48, 47, 46, 45, 44, 43, 42, 41];
    rightUpper: any = [21, 22, 23, 24, 25, 26, 27, 28];
    rightDown: any = [31, 32, 33, 34, 35, 36, 37, 38];

    employeeList!: [];
    clientList!: [];
    teethItemList!: [];
    shadeGuidList!: [];
    shadeList!: [];
    clientAddress: null;
    receiptList!: [];
    subTotal!: number = 0;
    total!: number = 0;
    currentReceipt: any;

    constructor(public formBuilder: FormBuilder, private _router: Router, private _orderService: OrderService) {
        this.shadeList = SHADE_LIST;
        this.shadeGuidList = SHADE_GUID_LIST;

    }

    ngOnInit(): void {
        this.formInit();
        this.getEmployeeList();
        this.getClientList();
        this.getItemList();

    }

    getEmployeeList() {
        this._orderService.getEmployeeList().subscribe((resp: any) => {
            this.employeeList = [];
            this.employeeList = resp;
        });
    }

    getClientList() {
        this._orderService.getClientList().subscribe((resp: any) => {
            this.clientList = [];
            this.clientList = resp;
        });
    }

    onChangeClientOption(e) {
        const selected = this.clientList.filter((item: any) => item.id == e);
        this.clientAddress = selected[0]['address'];
    }

    getItemList() {
        this._orderService.getItemList().subscribe((resp: any) => {
            this.teethItemList = [];
            this.teethItemList = resp;
        });
    }

    formInit() {
        this.orderCreateForm = this.formBuilder.group({
            discount: [''],
            additional_info: [''],
            additional_price: [''],
            client_id: ['', [Validators.required]],
            employee_id: ['', [Validators.required]],
            status: ['', [Validators.required]],
            total_amount: ['', [Validators.required]],
            order_date: ['', [Validators.required]],
            delivery_date: ['', [Validators.required]],
            patient_name: ['', [Validators.required]],
            order_no: ['', [Validators.required]],
            shade_guide: ['', [Validators.required]],
            shade: ['', [Validators.required]],
            items: ['', [Validators.required]],
            single_item: ['', [Validators.required]],
        });
    }

    deleteReceiptItem(index) {
        this.itemList.splice(index, 1);
        this.calculateSubTotal();
        this.dataSource = new MatTableDataSource(this.itemList);
    }

    onSelectSingleTooth(num: any) {
        const receiptObj = {
            description: num,
            id: this.currentReceipt.id,
            price: this.currentReceipt.price,
            quantity: 1,
            itemName: this.currentReceipt.name,
        }
        this.subTotal += Number(this.currentReceipt.price);
        this.calculateTotal();
        this.itemList.push(receiptObj);
        this.dataSource = new MatTableDataSource(this.itemList);
    }


    calculateSubTotal() {
        this.subTotal = 0;
        this.itemList.forEach((item: any) => {
            this.subTotal += Number(item.price);
        });
        this.subTotal += Number(this.orderCreateForm.value.additional_price);
        this.calculateTotal();
    }

    calculateTotal() {
        this.total = this.subTotal - Number(this.orderCreateForm.value.discount);
    }

    onChangeTeethItemOption(e) {
        let selected = this.teethItemList.filter((item: any) => item.id == e);
        this.currentReceipt = selected[0];
    }

    submitOrder() {
        this.orderCreateForm.patchValue({
            total_amount: this.total,
            items: this.itemList,
        });

        //----END ALL Patch----------//
        let formData = this.orderCreateForm.value;
        formData['order_date'] = formData['order_date'].toLocaleDateString();
        formData['delivery_date'] = formData['delivery_date'].toLocaleDateString();
        if (this.orderCreateForm.valid) {
            console.log("Valid");
            // console.log(this.clientFormGroup.value);
            /*  this._orderService.orderCreatePostRequest(formData)
                  .subscribe((resp: any) => {
                      console.log(resp);
                  });*/
        }
    }

}
