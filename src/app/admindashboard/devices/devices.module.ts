import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';
import { DxButtonModule, DxDataGridModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule } from 'devextreme-angular';
import { DxLookupModule,  DxValidatorModule } from 'devextreme-angular';
import {DxScrollViewModule,

  DxTextAreaModule,  DxTextBoxModule,DxFileUploaderModule,

  DxFormModule,
  DxAutocompleteModule,
 } from 'devextreme-angular';


@NgModule({
  declarations: [DevicesComponent],
  imports: [
    DxScrollViewModule,CommonModule,DxAutocompleteModule,DxFileUploaderModule,
    DevicesRoutingModule, DxTextAreaModule,
    DxFormModule,DxValidatorModule,
    DxDataGridModule,DxLookupModule,
    DxSelectBoxModule,DxTextBoxModule,
    DxPopupModule,
    DxButtonModule,
    DxTemplateModule
  ]
})
export class DevicesModule { }
