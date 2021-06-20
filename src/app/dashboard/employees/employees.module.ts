import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import {  DxButtonModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { DxSelectBoxModule} from 'devextreme-angular';
import { DxPopupModule} from 'devextreme-angular';

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,DxButtonModule,
    DxDataGridModule,DxSelectBoxModule,DxPopupModule
  ]
})
export class EmployeesModule { }
