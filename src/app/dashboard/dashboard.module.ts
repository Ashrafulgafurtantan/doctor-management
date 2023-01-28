import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoFlexyModule} from '../demo-flexy-module'
import {DashboardComponent} from './dashboard.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        DemoFlexyModule,
        FormsModule,
    ],
    exports: [
        DashboardComponent,
    ]
})
export class DashboardModule {
}
