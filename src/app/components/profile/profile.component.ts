import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    url: any;
    employeeFormGroup!: FormGroup;

    constructor(public formBuilder: FormBuilder, private _employeeService: EmployeeService) {
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
            console.log(this.employeeFormGroup.value)
            this._employeeService.employeeCreatePostRequest(this.employeeFormGroup.value)
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
            this.employeeFormGroup.patchValue({
                nid: file
            });
        }
    }

}
