import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RtRoutingModule } from './rt-routing.module';
import { RtComponent } from './rt.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
import { DxButtonModule, DxLookupModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import dxButton from 'devextreme/ui/button';
import { DxFormModule} from 'devextreme-angular';

@NgModule({
  declarations: [RtComponent],
  imports: [
    CommonModule,ChartModule, DxButtonModule, DxLookupModule, DxSelectBoxModule, DxTextBoxModule,DxFormModule,

    RtRoutingModule
  ]
})
export class RtModule { }
