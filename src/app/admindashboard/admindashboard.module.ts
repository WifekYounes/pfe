import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { AdmindashboardComponent } from './admindashboard.component';


@NgModule({
  declarations: [AdmindashboardComponent],
  imports: [
    CommonModule,
    AdmindashboardRoutingModule
  ],
})
export class AdmindashboardModule { }
