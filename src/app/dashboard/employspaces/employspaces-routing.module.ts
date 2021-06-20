import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployspacesComponent } from './employspaces.component';

const routes: Routes = [{ path: '', component: EmployspacesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployspacesRoutingModule { }
