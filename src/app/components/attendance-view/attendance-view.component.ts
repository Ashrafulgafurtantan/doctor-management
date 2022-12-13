import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

interface IPost {
  id: string;
  author?: string;
  title?: string;
  category?: string;
  date?: string;

}
@Component({
  selector: 'app-attendance-view',
  templateUrl: './attendance-view.component.html',
  styleUrls: ['./attendance-view.component.scss']
})
export class AttendanceViewComponent implements OnInit {
  dataSource:MatTableDataSource<any>;
  posts:IPost[];
  columns:String[] = ['id','author','title', 'category', 'date']
  @ViewChild(MatSort,{static:true}) sort: MatSort | any;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator | any;

  constructor() {
    this.posts=[
      {
        id: '1',
        title: 'System Architect',
        author: 'Edinburgh',
        category: 'Animal',
        date: '2027/11/08',

      },
      {
        id: '2',
        author: 'Sun',
        title: '3rd Law',
        category: 'Physics',
        date: '2019/02/1',

      },
      {
        id: '3',
        author: 'Ryan',
        title: 'Software Tool',
        category: 'Sakib Sir',
        date: '2021/9/23',

      },
      {
        id: '4',
        author: 'Extension',
        title: 'Jiraboard',
        category: 'Moumita',
        date: '2016/08/5',

      },
      {
        id: '5',
        author: 'Sadi',
        title: 'One Eyed Man',
        category: 'Brails',
        date: '2034/12/2',

      }
    ];
    this.dataSource = new MatTableDataSource(this.posts);
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
