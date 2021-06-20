import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientDevicesComponent } from './client-devices.component';

const routes: Routes = [{ path: '', component: ClientDevicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientDevicesRoutingModule { }
