import { Component, OnInit } from '@angular/core';
import {navbarData} from "./nav-data";
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
interface SideNavNode {
  name: string;
  children?: SideNavNode[];
  icon: string;
}
const TREE_DATA: SideNavNode[] = [
  {
    name:'Dashboard',
    icon: 'home',
  },
  {
    name: 'Employee',
    icon: 'person',
    children: [{name: 'Attendance', icon: 'adjust'}],
  },
  {
    name: 'Order',
    icon: 'shopping_cart',
    children: [{name: 'Order', icon: 'adjust'}, {name: 'Order Create', icon: 'adjust'}],
  },
  {
    name: 'Summary',
    icon: 'assignment',
    children: [{name: 'Work Status Summary', icon: 'adjust'}, {name: 'Work Summary', icon: 'adjust'}],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  icon: string;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private _transformer = (node: SideNavNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      icon: node.icon
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
  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  collapsed = false;
  navData = navbarData;
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
