import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {UserModel} from "../../models/user.model";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup| any;
  user: UserModel = new UserModel();
  constructor(private _router: Router) {
    this.initializeForm();
  }
  initializeForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  ngOnInit(): void {
    let isLoggedIn = JSON.parse(localStorage.getItem("currentUser")|| '{}');

    if(Object.keys(isLoggedIn).length !== 0){
      this._router.navigateByUrl('/home').then(r => console.log(""));
    }
  }
  onSubmit(){
    this.user.username = this.loginForm.value.username;
    this.user.password = this.loginForm.value.password;
    if(this.user.username.toLowerCase() == 'admin'){
      this.user.role = 1;
    }else{
      this.user.role = 2;
    }
    localStorage.setItem("currentUser",JSON.stringify(this.user));
    this._router.navigate(['home'], { state: { needCredentials: true } });
    // this._router.navigateByUrl('/home',{ state: {user:"Hello", foo: 'bar'} }).then(r => console.log(""));
  }
}
