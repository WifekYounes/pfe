import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRoutingModule } from './password-routing.module';
import { PasswordComponent } from './password.component';
import {
} from 'devextreme-angular';
import { DxFileUploaderModule,  DxButtonModule,	DxSelectBoxModule,
 DxTextAreaModule,
 DxDateBoxModule,
 DxFormModule , DxTextBoxModule, DxValidatorModule} from "devextreme-angular";

@NgModule({
  declarations: [PasswordComponent],
  imports: [
    CommonModule,
    PasswordRoutingModule,DxTextBoxModule,DxFileUploaderModule,  DxButtonModule,	DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,DxValidatorModule,
    DxFormModule
  ]
})
export class PasswordModule { }
