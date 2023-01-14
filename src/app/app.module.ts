import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {MatTreeModule} from "@angular/material/tree";

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BodyComponent,
    SidenavComponent,
    StatisticsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FeatherModule.pick(allIcons),
        DemoFlexyModule,
        DashboardModule,
        ComponentsModule,
        FormsModule,
        MatTreeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
