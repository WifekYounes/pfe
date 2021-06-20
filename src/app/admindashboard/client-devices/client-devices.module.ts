import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDevicesRoutingModule } from './client-devices-routing.module';
import { ClientDevicesComponent } from './client-devices.component';
import { DxButtonModule, DxLookupModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import dxButton from 'devextreme/ui/button';
import { DxFormModule} from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [ClientDevicesComponent],
  imports: [
    CommonModule,
    ClientDevicesRoutingModule,
    DxSelectBoxModule,
    DxTextBoxModule,DxFormModule,
    DxLookupModule,
    DxButtonModule,DxDataGridModule,
    DxLookupModule
  ]
})
export class ClientDevicesModule { }
