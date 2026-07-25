import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserModel } from "../../models/user.model";
import { AuthenticationService } from "../../services/authentication.service";
import { AlertMessageService } from "../../services/alert-message.service";
import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [
    // Fade the whole page in on load
    trigger("pageEnter", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("500ms ease-out", style({ opacity: 1 })),
      ]),
    ]),
    // Staggered, spring-like reveal for the form elements
    trigger("formStagger", [
      transition(":enter", [
        query(
          ".anim-item",
          [
            style({ opacity: 0, transform: "translateY(22px)" }),
            stagger(85, [
              animate(
                "600ms cubic-bezier(0.22, 1, 0.36, 1)",
                style({ opacity: 1, transform: "translateY(0)" }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    // Slide-in reveal for the branding column
    trigger("brandStagger", [
      transition(":enter", [
        query(
          ".brand-anim",
          [
            style({ opacity: 0, transform: "translateX(-26px)" }),
            stagger(110, [
              animate(
                "650ms cubic-bezier(0.22, 1, 0.36, 1)",
                style({ opacity: 1, transform: "translateX(0)" }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    // Shake the card when login fails
    trigger("errorShake", [
      transition(":enter", [
        animate(
          "450ms",
          keyframes([
            style({ transform: "translateX(0)", offset: 0 }),
            style({ transform: "translateX(-9px)", offset: 0.2 }),
            style({ transform: "translateX(8px)", offset: 0.4 }),
            style({ transform: "translateX(-6px)", offset: 0.6 }),
            style({ transform: "translateX(4px)", offset: 0.8 }),
            style({ transform: "translateX(0)", offset: 1 }),
          ]),
        ),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  user: UserModel = new UserModel();
  visibilityForPass: boolean = false;
  loading: boolean = false;
  errorMessage: string = "";

  constructor(
    private _router: Router,
    private _alertMsg: AlertMessageService,
    private _authService: AuthenticationService,
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    /*  let isLoggedIn = JSON.parse(localStorage.getItem("currentUser") || '{}');

          if (Object.keys(isLoggedIn).length !== 0) {
              this._router.navigateByUrl('/home').then(r => console.log(""));
          }*/
  }

  toggleVisibility() {
    this.visibilityForPass = !this.visibilityForPass;
  }

  invalid(name: string): boolean {
    const control = this.loginForm.get(name);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.loginForm.valid && !this.loading) {
      this.loading = true;
      this.errorMessage = "";
      this._authService.loginServiceMethod(this.loginForm.value).subscribe(
        (resp: any) => {
          if (!resp.message) {
            window.location.assign("home" + "?login=true");
            // this._router.navigate(['home'], {state: {needCredentials: true}});
          } else {
            this.loading = false;
            this.errorMessage = resp.message;
            // this._messageService.showToastMessage(msg, false);
          }
        },
        (error: any) => {
          this.loading = false;
          this.errorMessage = "Invalid username or password. Please try again.";
          this._authService.httpRequestErrorHandler(error);
        },
      );
    }
  }
}
