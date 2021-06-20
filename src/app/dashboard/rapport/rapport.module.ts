import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RapportRoutingModule } from './rapport-routing.module';
import { RapportComponent } from './rapport.component';
import { DxCheckBoxModule} from 'devextreme-angular';
import { DxButtonModule, DxLookupModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import dxButton from 'devextreme/ui/button';
import { DxFormModule} from 'devextreme-angular';

import { DxDateBoxModule } from 'devextreme-angular';
import { DxDataGridModule, DxScrollViewModule } from 'devextreme-angular';
@NgModule({
  declarations: [RapportComponent],
  imports: [
    CommonModule,
    RapportRoutingModule,DxButtonModule,
    DxLookupModule, DxSelectBoxModule,DxDataGridModule,DxScrollViewModule,
     DxTextBoxModule, DxFormModule,
    DxCheckBoxModule,DxDateBoxModule
  ]
})
export class RapportModule { }
