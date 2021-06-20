import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {
 } from 'devextreme-angular';
 import { DxTextBoxModule,DxFileUploaderModule,  DxButtonModule,	DxSelectBoxModule,
	DxTextAreaModule,
	DxDateBoxModule,
	DxFormModule } from "devextreme-angular";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,DxFormModule,DxTextBoxModule,  DxButtonModule,	DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    ProfileRoutingModule,DxFileUploaderModule
  ]
})
export class ProfileModule { }
