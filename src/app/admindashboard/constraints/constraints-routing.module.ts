import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConstraintsComponent } from './constraints.component';

const routes: Routes = [{ path: '', component: ConstraintsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConstraintsRoutingModule { }
