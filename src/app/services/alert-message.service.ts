// @ts-nocheck
import Swal from "sweetalert2/dist/sweetalert2.js";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AlertMessageService {

    constructor() {
    }

    loginSuccessfulAlert() {
        Swal.fire('Good Job!', 'Successfully Logged In.', 'success');
    }

    successfulSubmissionAlert(title: string) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: 1200
        })
    }

    errorAlert() {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!\nPlease Try Again',
        })
    }

    deleteItemAlert() {
        return Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                return true;
            } else {
                return false;
            }
        })
    }
}
