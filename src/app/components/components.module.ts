// @ts-nocheck
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatherModule} from 'angular-feather';
import {allIcons} from 'angular-feather/icons';
import {DemoFlexyModule} from '../demo-flexy-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {AttendanceCreateComponent} from './attendance-create/attendance-create.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderCreateComponent} from './order-create/order-create.component';
import {SearchComponent} from './search/search.component';
import {AttendanceListComponent} from './attendance-list/attendance-list.component';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {ClientCreateComponent} from './client-create/client-create.component';
import {ProfileComponent} from './profile/profile.component';
import {ItemComponent} from './item/item.component';
import {OrderStatusComponent} from './order-status/order-status.component';
import {SummaryComponent} from './summary/summary.component';
import {EmployeeTableComponent} from './employee-table/employee-table.component';
import {ClientTableComponent} from './client-table/client-table.component';
import {ItemTableComponent} from './item-table/item-table.component';
import {LandingPageComponent} from './landing-page/landing-page.component';

@NgModule({
    declarations: [
        LoginComponent,
        AttendanceCreateComponent,
        OrderListComponent,
        OrderCreateComponent,
        SearchComponent,
        AttendanceListComponent,
        EmployeeCreateComponent,
        ClientCreateComponent,
        ProfileComponent,
        ItemComponent,
        OrderStatusComponent,
        SummaryComponent,
        EmployeeTableComponent,
        ClientTableComponent,
        ItemTableComponent,
        LandingPageComponent,
    ],
    imports: [
        CommonModule,
        FeatherModule.pick(allIcons),
        DemoFlexyModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        LandingPageComponent,
    ]
})
// @ts-ignore
export class ComponentsModule {
}
