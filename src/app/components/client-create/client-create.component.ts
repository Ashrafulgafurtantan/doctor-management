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
    imageFile!: File;

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
            // photo: ['',],
        });
    }


    onSubmit() {
        if (this.clientFormGroup.valid) {
            const formData = this.createPostRequestFormData();
            this._clientService.clientCreatePostRequest(formData)
                .subscribe((resp: any) => {
                    console.log(resp);
                });
        }
    }

    createPostRequestFormData(): FormData {
        const formData = new FormData();
        //formData.append('photo', this.imageFile);
        formData.append('name', this.clientFormGroup.value.name);
        formData.append('phone', this.clientFormGroup.value.phone);
        formData.append('address', this.clientFormGroup.value.address);
        return formData;
    }

    onFileSelected(event: any) {
        this.imageFile = event.target.files[0];
        if (this.imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(this.imageFile);
            reader.onload = (_event) => {
                this.url = reader.result;
            }
            this.clientFormGroup.patchValue({
                photo: this.imageFile
            });
        }
    }

}
