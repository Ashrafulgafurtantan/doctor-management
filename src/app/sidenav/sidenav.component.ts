import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import {navbarData} from "./nav-data";
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
interface SideNavNode {
  name: string;
  children?: SideNavNode[];
  icon: string;
  routerLink: string;
}
const TREE_DATA: SideNavNode[] = [
  {
    name:'Dashboard',
    icon: 'home',
    routerLink: '/home'
  },
  {
    name: 'Employee',
    icon: 'person',
    routerLink: '/',
    children: [{name: 'Attendance', icon: 'adjust', routerLink: '/table'}],
  },
  {
    name: 'Order',
    icon: 'shopping_cart',
    routerLink: '/',
    children: [{name: 'Order', icon: 'adjust',routerLink: '/tabs',}, {name: 'Order Create', icon: 'adjust',routerLink: '/slider',}],
  },
  {
    name: 'Summary',
    icon: 'assignment',
    routerLink: '/',
    children: [{name: 'Work Status Summary', icon: 'adjust',routerLink: '/slide-toggle',}, {name: 'Work Summary',routerLink: '/snackbar', icon: 'adjust'}],
  },
];
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  icon: string;
  routerLink: string;
}
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  screenWidth = 0;
  collapsed = false;
  navData = navbarData;
  private _transformer = (node: SideNavNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      icon: node.icon,
      routerLink: node.routerLink
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level,
      node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
      this._transformer,
      node => node.level,
      node => node.expandable,
      node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
