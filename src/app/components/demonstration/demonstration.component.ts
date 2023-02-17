import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-demonstration',
    templateUrl: './demonstration.component.html',
    styleUrls: ['./demonstration.component.scss']
})
export class DemonstrationComponent implements OnInit {
    first = 1;
    last = 20;
    current = 8;
    diffBetweenFirstToCurrent = 0;
    diffBetweenLastToCurrent = 0;

    constructor() {
    }

    ngOnInit(): void {
        this.diffBetweenFirstToCurrent = Math.abs(this.current - this.first);
        this.diffBetweenLastToCurrent = Math.abs(this.last - this.current);
    }

}
