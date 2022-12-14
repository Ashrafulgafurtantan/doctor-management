import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  ngOnInit(): void {
  }

}
