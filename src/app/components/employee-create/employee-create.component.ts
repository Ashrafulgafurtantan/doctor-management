import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-employee-create',
    templateUrl: './employee-create.component.html',
    styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {
    url: any;
    employeeFormGroup!: FormGroup;
    imageFile!: File;

    constructor(public formBuilder: FormBuilder, private _router: Router, private _employeeService: EmployeeService) {
    }

    ngOnInit(): void {
        this.formInit();
    }

    formInit() {
        this.employeeFormGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            nid: ['', [Validators.required]],
        });
    }

    onSubmit() {
        if (this.employeeFormGroup.valid) {
            const formData = this.createPostRequestFormData();
            this._employeeService.employeeCreatePostRequest(formData)
                .subscribe((resp: any) => {
                    console.log(resp);
                    this._router.navigateByUrl('/attendance-list').then();
                });
        }
    }

    createPostRequestFormData(): FormData {
        const formData = new FormData();
        formData.append('nid', this.imageFile);
        formData.append('name', this.employeeFormGroup.value.name);
        formData.append('phone', this.employeeFormGroup.value.phone);
        formData.append('address', this.employeeFormGroup.value.address);
        return formData;
    }

    onFileSelected(event: any) {
        this.imageFile = event.target.files[0];
        if (this.imageFile) {
            console.log(this.imageFile.name);
            console.log(this.imageFile.size);
            const reader = new FileReader();
            reader.readAsDataURL(this.imageFile);

            reader.onload = (_event) => {
                this.url = reader.result;
            }
            this.employeeFormGroup.patchValue({
                nid: this.imageFile
            });
        }
    }

    cancel() {
        this._router.navigateByUrl('/attendance-list').then();
    }

}
