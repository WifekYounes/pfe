import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientareasComponent } from './clientareas.component';

const routes: Routes = [{ path: '', component: ClientareasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientareasRoutingModule { }
