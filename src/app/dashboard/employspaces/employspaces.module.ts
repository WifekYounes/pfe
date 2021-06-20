import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployspacesRoutingModule } from './employspaces-routing.module';
import { EmployspacesComponent } from './employspaces.component';
import { DxButtonModule, DxLookupModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import dxButton from 'devextreme/ui/button';
import { DxFormModule} from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [EmployspacesComponent],
  imports: [
    CommonModule, DxButtonModule, DxLookupModule, DxSelectBoxModule, DxTextBoxModule,
    EmployspacesRoutingModule,DxDataGridModule,DxFormModule
  ]
})
export class EmployspacesModule { }
