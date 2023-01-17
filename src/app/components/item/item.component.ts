import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../services/item.service";

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
    itemFormGroup!: FormGroup;

    constructor(public formBuilder: FormBuilder, private _itemService: ItemService) {
    }

    ngOnInit(): void {
        this.formInit();
    }

    formInit() {
        this.itemFormGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            price: ['', [Validators.required]],

        });
    }

    onSubmit() {
        if (this.itemFormGroup.valid) {
            this._itemService.itemCreatePostRequest(this.itemFormGroup.value)
                .subscribe((resp: any) => {
                    console.log(resp);
                });
        }
    }

}
