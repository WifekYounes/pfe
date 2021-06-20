import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpacesRoutingModule } from './spaces-routing.module';
import { SpacesComponent } from './spaces.component';
import { DxDataGridModule,DxButtonModule, DxScrollViewModule,DxSelectBoxModule } from 'devextreme-angular';



@NgModule({
  declarations: [SpacesComponent],
  imports: [
    CommonModule,DxDataGridModule, DxSelectBoxModule ,DxScrollViewModule,
    SpacesRoutingModule,DxButtonModule
  ]
})
export class SpacesModule { }
