import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlertsComponent} from './components/alerts/alerts.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./gaurds/auth.guard";
import {AttendanceCreateComponent} from "./components/attendance-create/attendance-create.component";
import {OrderListComponent} from "./components/order-list/order-list.component";
import {OrderCreateComponent} from "./components/order-create/order-create.component";
import {SearchComponent} from "./components/search/search.component";
import {AttendanceListComponent} from './components/attendance-list/attendance-list.component';
import {EmployeeCreateComponent} from "./components/employee-create/employee-create.component";
import {ClientCreateComponent} from "./components/client-create/client-create.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ItemComponent} from './components/item/item.component';
import {OrderStatusComponent} from "./components/order-status/order-status.component";
import {SummaryComponent} from "./components/summary/summary.component";

const routes: Routes = [
    {path: "", redirectTo: "/login", pathMatch: "full"},
    {path: "home", component: DashboardComponent, canActivate: [AuthGuard]},
    {path: "alerts", component: AlertsComponent},
    {path: "create", component: AttendanceCreateComponent, canActivate: [AuthGuard]},
    {path: "attendance-list", component: AttendanceListComponent, canActivate: [AuthGuard]},
    {path: "employee-create", component: EmployeeCreateComponent, canActivate: [AuthGuard]},
    {path: "client-create", component: ClientCreateComponent, canActivate: [AuthGuard]},
    {path: "item-create", component: ItemComponent, canActivate: [AuthGuard]},
    {path: "search", component: SearchComponent, canActivate: [AuthGuard]},
    {path: "summary/:summaryType", component: SummaryComponent, canActivate: [AuthGuard]},
    {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
    {path: "orders", component: OrderListComponent, canActivate: [AuthGuard]},
    {path: "orders/create", component: OrderCreateComponent, canActivate: [AuthGuard]},
    {path: 'orders/status/:orderID', component: OrderStatusComponent, canActivate: [AuthGuard]},
    {path: "login", component: LoginComponent, pathMatch: "full"},
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "**", redirectTo: "/home", pathMatch: "full"},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
