import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from "../../models/user.model";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup | any;
    user: UserModel = new UserModel();

    constructor(private _router: Router, private _authService: AuthenticationService) {
        this.initializeForm();
    }

    initializeForm() {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void {
        /*  let isLoggedIn = JSON.parse(localStorage.getItem("currentUser") || '{}');

          if (Object.keys(isLoggedIn).length !== 0) {
              this._router.navigateByUrl('/home').then(r => console.log(""));
          }*/
    }

    onSubmit() {

        if (this.loginForm.valid) {
            this._authService
                .loginServiceMethod(this.loginForm.value)
                .subscribe(
                    (resp: any) => {
                        console.log(resp);
                        if (!resp.message) {
                            this._router.navigate(['home'], {state: {needCredentials: true}});
                        } else {
                            // this._messageService.showToastMessage(msg, false);
                        }
                    },
                    (err: any) => {
                        let msg = err.message;
                        // this._messageService.showToastMessage(msg, false);
                    }
                );
        } else {
            // this._messageService.showToastMessage(msg, false);
        }
    }
}
