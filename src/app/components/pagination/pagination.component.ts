import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    @Input() first: any;
    @Input() last: any;
    @Input() current: any;

    @Output() nextBtn = new EventEmitter();
    @Output() prevBtn = new EventEmitter();
    @Output() numberBtn = new EventEmitter();


    /*    first = 1;
        last = 3;
        current = 2;*/
    diffBetweenFirstToCurrent = 0;
    diffBetweenLastToCurrent = 0;


    constructor() {
    }

    ngOnInit(): void {
        this.diffBetweenFirstToCurrent = Math.abs(this.current - this.first);
        this.diffBetweenLastToCurrent = Math.abs(this.last - this.current);
    }

    nextBtnClick() {
        this.nextBtn.emit();
    }

    prevBtnClick() {
        this.prevBtn.emit();
    }

    numberBtnClick(val: any) {
        this.numberBtn.emit(val);
    }
}
