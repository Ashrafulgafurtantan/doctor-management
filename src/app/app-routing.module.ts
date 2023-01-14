import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./gaurds/auth.guard";
import {AttendanceCreateComponent} from "./components/attendance-create/attendance-create.component";
import {OrderListComponent} from "./components/order-list/order-list.component";
import {OrderCreateComponent} from "./components/order-create/order-create.component";
import {SearchComponent} from "./components/search/search.component";
const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"home", component:DashboardComponent, canActivate:[AuthGuard]},
  {path:"alerts", component:AlertsComponent},
  {path:"create", component:AttendanceCreateComponent, canActivate:[AuthGuard]},
  {path:"search", component:SearchComponent},
  {path:"orders", component:OrderListComponent, canActivate:[AuthGuard]},
  {path:"orders/create", component:OrderCreateComponent, canActivate:[AuthGuard]},
  {path:"forms", component:FormsComponent},
  {path:"table", component:ProductComponent, canActivate:[AuthGuard]},
  {path:"grid-list", component:GridListComponent},
  {path:"menu", component:MenuComponent, canActivate:[AuthGuard]},
  {path:"tabs", component:TabsComponent},
  {path:"expansion", component:ExpansionComponent},
  {path:"chips", component:ChipsComponent},
  {path:"progress", component:ProgressComponent},
  {path:"toolbar", component:ToolbarComponent},
  {path:"progress-snipper", component:ProgressSnipperComponent},
  {path:"snackbar", component:SnackbarComponent},
  {path:"slider", component:SliderComponent},
  {path:"slide-toggle", component:SlideToggleComponent},
  {path:"tooltip", component:TooltipsComponent},
  {path:"button", component:ButtonsComponent},
  {path:"login",component:LoginComponent, pathMatch:"full"},
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"**", redirectTo:"/home", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
