import { Component, OnInit } from '@angular/core';
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
    children: [{name: 'Attendance', icon: ''}],
  },
  {
    name: 'Order',
    icon: 'shopping_cart',
    children: [{name: 'Order', icon: ''}, {name: 'Order Create', icon: ''}],
  },
  {
    name: 'Summary',
    icon: 'assignment',
    children: [{name: 'Work Status Summary', icon: ''}, {name: 'Work Summary', icon: ''}],
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
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
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

  ngOnInit(): void {
  }

}
