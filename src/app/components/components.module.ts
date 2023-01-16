import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertsComponent} from './alerts/alerts.component';
import {FeatherModule} from 'angular-feather';
import {allIcons} from 'angular-feather/icons';
import {FormsComponent} from './forms/forms.component';
import {DemoFlexyModule} from '../demo-flexy-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {ButtonsComponent} from './buttons/buttons.component';
import {TooltipsComponent} from './tooltips/tooltips.component';
import {LoginComponent} from './login/login.component';
import {AttendanceCreateComponent} from './attendance-create/attendance-create.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderCreateComponent} from './order-create/order-create.component';
import {SearchComponent} from './search/search.component';
import {AttendanceListComponent} from './attendance-list/attendance-list.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { ClientCreateComponent } from './client-create/client-create.component';

@NgModule({
    declarations: [
        AlertsComponent,
        FormsComponent,
        ToolbarComponent,
        ButtonsComponent,
        TooltipsComponent,
        LoginComponent,
        AttendanceCreateComponent,
        OrderListComponent,
        OrderCreateComponent,
        SearchComponent,
        AttendanceListComponent,
        EmployeeCreateComponent,
        ClientCreateComponent,
    ],
    imports: [
        CommonModule,
        FeatherModule.pick(allIcons),
        DemoFlexyModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        AlertsComponent,
        FormsComponent,
        ToolbarComponent,
        ButtonsComponent,
    ]
})
// @ts-ignore
export class ComponentsModule {
}
