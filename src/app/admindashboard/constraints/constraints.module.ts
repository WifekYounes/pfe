import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstraintsRoutingModule } from './constraints-routing.module';
import { ConstraintsComponent } from './constraints.component';
import { DxDataGridModule, DxSelectBoxModule, DxButtonModule } from 'devextreme-angular';
import { DxPopupModule } from "devextreme-angular";
import { DxLookupModule, DxTemplateModule } from 'devextreme-angular';

@NgModule({
  declarations: [ConstraintsComponent],
  imports: [
    CommonModule,
    ConstraintsRoutingModule, DxDataGridModule, DxSelectBoxModule, DxButtonModule,DxPopupModule
    ,DxLookupModule, DxTemplateModule
  ]
})
export class ConstraintsModule { }
