import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { DxDataGridModule, DxSelectBoxModule, DxButtonModule } from 'devextreme-angular';
import { DxPopupModule } from "devextreme-angular";

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule, DxDataGridModule, DxSelectBoxModule, DxButtonModule ,DxPopupModule
  ]
})
export class UsersModule { }
