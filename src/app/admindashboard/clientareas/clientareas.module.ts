import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientareasRoutingModule } from './clientareas-routing.module';
import { ClientareasComponent } from './clientareas.component';
import { DxButtonModule, DxLookupModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import dxButton from 'devextreme/ui/button';
import { DxFormModule} from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [ClientareasComponent],
  imports: [
    CommonModule,
    ClientareasRoutingModule,
    DxSelectBoxModule,
    DxTextBoxModule,DxFormModule,
    DxLookupModule,
    DxButtonModule,DxDataGridModule,
    DxLookupModule
  ]
})
export class ClientareasModule { }
