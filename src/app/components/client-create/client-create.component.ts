import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {ClientService} from "../../services/client.service";

@Component({
    selector: 'app-client-create',
    templateUrl: './client-create.component.html',
    styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

    url: any;
    clientFormGroup!: FormGroup;

    constructor(public formBuilder: FormBuilder, private _clientService: ClientService) {
    }

    ngOnInit(): void {
        this.formInit();
    }

    formInit() {
        this.clientFormGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            photo: ['',],
        });
    }

    onSubmit() {
        if (this.clientFormGroup.valid) {
            console.log(this.clientFormGroup.value)
            this._clientService.clientCreatePostRequest(this.clientFormGroup.value)
                .subscribe((resp: any) => {
                    console.log(resp);
                });
        }
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            console.log(file.name);
            console.log(file.size);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (_event) => {
                this.url = reader.result;
            }
            this.clientFormGroup.patchValue({
                photo: file
            });
        }
    }

}
