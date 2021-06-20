import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RtComponent } from './rt.component';

const routes: Routes = [{ path: '', component: RtComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RtRoutingModule { }
