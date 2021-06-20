import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { AreasComponent } from './areas.component';
import { DxDataGridModule } from 'devextreme-angular';
import { DxButtonModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule } from 'devextreme-angular';
import { DxLookupModule,  DxValidatorModule } from 'devextreme-angular';
import {

  DxTextAreaModule,  DxTextBoxModule,

  DxFormModule,
  DxAutocompleteModule,
 } from 'devextreme-angular';
@NgModule({
  declarations: [AreasComponent],
  imports: [DxTemplateModule,
     DxSelectBoxModule,DxTextAreaModule,  DxTextBoxModule,DxButtonModule, DxPopupModule,DxDataGridModule,

    DxFormModule,CommonModule,
    DxAutocompleteModule, DxLookupModule,  DxValidatorModule,
    AreasRoutingModule
  ]
})
export class AreasModule { }
