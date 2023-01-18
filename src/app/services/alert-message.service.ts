// @ts-nocheck
import Swal from "sweetalert2/dist/sweetalert2.js";
import {Injectable} from '@angular/core';


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
}
