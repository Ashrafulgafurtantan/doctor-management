import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser:UserModel | any;

  constructor(private router : Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.currentUser= JSON.parse(localStorage.getItem("currentUser")|| '{}');
    if(this.currentUser.role !==1 ) {
       this.router.navigate(["login"]);
       return false;
    }
    return true;
  }

}
