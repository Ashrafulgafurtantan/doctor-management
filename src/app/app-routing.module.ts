import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlertsComponent} from './components/alerts/alerts.component';
import {ButtonsComponent} from './components/buttons/buttons.component';
import {FormsComponent} from './components/forms/forms.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {TooltipsComponent} from './components/tooltips/tooltips.component';
import {ProductComponent} from './dashboard/dashboard-components/product/product.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./gaurds/auth.guard";
import {AttendanceCreateComponent} from "./components/attendance-create/attendance-create.component";
import {OrderListComponent} from "./components/order-list/order-list.component";
import {OrderCreateComponent} from "./components/order-create/order-create.component";
import {SearchComponent} from "./components/search/search.component";
import {AttendanceListComponent} from './components/attendance-list/attendance-list.component';

const routes: Routes = [
    {path: "", redirectTo: "/login", pathMatch: "full"},
    {path: "home", component: DashboardComponent, canActivate: [AuthGuard]},
    {path: "alerts", component: AlertsComponent},
    {path: "create", component: AttendanceCreateComponent, canActivate: [AuthGuard]},
    {path: "attendance-list", component: AttendanceListComponent, canActivate: [AuthGuard]},
    {path: "search", component: SearchComponent},
    {path: "orders", component: OrderListComponent, canActivate: [AuthGuard]},
    {path: "orders/create", component: OrderCreateComponent, canActivate: [AuthGuard]},
    {path: "forms", component: FormsComponent},
    {path: "table", component: ProductComponent, canActivate: [AuthGuard]},
    {path: "toolbar", component: ToolbarComponent},
    {path: "tooltip", component: TooltipsComponent},
    {path: "button", component: ButtonsComponent},
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
