import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateTimeService {

    constructor() {
    }

    getYearMonthDayFormat(data: any): String {

        return data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate();
        /*console.log(data.getFullYear());
        console.log(data.getDate());
        console.log(data.getMonth() + 1);
          return '';*/
    }
}
