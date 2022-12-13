import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

export interface PeriodicElement {
  id: number;
  name: string;
  priority: string;
  badge: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Deep Javiya',  priority: 'Present', badge: 'badge-success', date: '2027/11/08', },
  { id: 2, name: 'Nirav Joshi',   priority: 'Present', badge: 'badge-success', date: '2019/02/1', },
  { id: 3, name: 'Sunil Joshi',  priority: 'Absent', badge: 'badge-danger', date: '2021/9/23', },
  { id: 4, name: 'Maruti Makwana',  priority: 'Absent', badge: 'badge-danger', date: '2016/08/5', },
];


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['id', 'assigned', 'priority', 'date'];
  dataSource:MatTableDataSource<any>;
  products:PeriodicElement[];

  @ViewChild(MatSort,{static:true}) sort: MatSort | any;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator | any;
  constructor() {
    this.products=ELEMENT_DATA;
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(e: any):void{
    const filterValue = e.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
