import { Component, OnInit } from '@angular/core';
import {navbarData} from "./nav-data";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  collapsed = false;
  navData = navbarData;
  constructor() { }

  ngOnInit(): void {
  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    //this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
   // this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
